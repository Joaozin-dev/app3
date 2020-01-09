//        O
// 		/ | \
//       \ /
const fb = require("../config/firebase");
const CodeAPI = require("../config/code");
const SExist = require("../config/sexist");
function socketExists(arr, socket) {
  return arr.some(function(el) {
    return el.socket === socket;
  });
}
module.exports = {
  // ADICIONAR UMA "SCREEN" OU UMA SESSÃO
  setConnectionScreen(socket) {
    // COLOCA O SOCKET ID DENTRO DE UMA VARIAVEL
    const Socket = socket.id;
    // COLOCA O CODE DENTRO DE UMA VARIAVEL
    const Code = CodeAPI.getCode(socket);
    // CONECTA COM O FIREBASE
    const db = fb.database();
    // DECLARA UM VALOR 0 PARA A VARIAVEL "I";
    var i = -1;
    // FAZ REFERENCIA DO JSON NO FIREBASE
    db.ref("conexao/").on("value", snapshot => {
      // MAPEIA TUDO
      snapshot.forEach(item => {
        /**
         * ATRIBUI O I PARA A KEY DA POSIÇÃO ARRAY
         * PARA FAZ TIPO UM ALTO ENCREMENTO IGUAL
         * A DO MYSQL
         */
        i = item.key;
      });
    });
    // TRANSFORMO O VALOR RETORNADO STRING) EM UM VALOR INTEIRO(INT)
    var val = parseInt(i);
    /**
     * VERIFICO QUANTOS CONEXÕES JÁ TEM
     * E ADICIONO MAIS 1
     * TIPO 3+1 = 4 4+1 = 5
     * E ATRIBUI VALORES GAME = 'NENHUM'(O JOGO QUE ESTA JOGANDO)
     * O CODE = 'CODIGO GERADO PELO BACK-END'
     * O SOCKET = 'VALOR DO SOCKET DA "SCREEN"'
     */
    const ID = val + 1;
    db.ref(`conexao/${ID}`).set({ Game: "Nenhum", Code, Socket, ID });
    socket.emit("screen-code", { Code });
  },

  // REMOVER UMA "SCREEN" OU SESSÃO INTEIRA
  async removeConnection(socket) {
    // CONECTA COM O FIREBASE
    const db = fb.database();
    // VARIAVEL DE APOIO
    var array = [];
    var key = [];
    // FAZ REFERENCIA DO JSON NO FIREBASE
    db.ref("conexao/").once("value", snapshot => {
      // MAPEIA TODA A ARRAY RETORNADA E ATRIBUI NA VARIAVEL DE APOIO
      snapshot.forEach(item => {
        // FICA ADICIONANDO TODOS OS ARRAY EM CACHE(OU VARIAVEL)
        array.push(item.val());
      });
    });
    //FAZ UM LOOP NO ARRAY
    for (var i = 0; i < array.length; i++) {
      /*
       * VERIFICO CADA UM ATE QUE O VALOR DO SOCKET-ID
       * SEJA IGUAL A QUAL QUER UM QUE ESTÁ NO BANCO DE DADOS
       */
      if (array[i].Socket === socket.id) {
        // REMOVE A SESSÃO DE ACORDO COM A REFERENCIA
        db.ref(`conexao/${i}/Jogadores`).once("value", snapshot => {
          // MAPEIA TODO O VALOR RETORNADO EM ARRAY
          snapshot.forEach(item => {
            // ENVIA UM EVENTO "REMOVE-CONNTECTION" VALENDO TRUE
            socket.to(item.val().socket).emit("remove-connection", true);
          });
        });
        // REMOVE DE ACORDO COM SEU ID
        db.ref(`conexao/${array[i].ID}`).remove();
      } else {
        //VARIAVEL DE APOIO
        var jogArray = [];
        var bdsocket = null;
        // FAZ REFERENCIA DO JSON NO FIREBASE
        db.ref(`conexao/${array[i].ID}/Jogadores`).once("value", addplayers => {
          addplayers.forEach(playersitems => {
            jogArray.push(playersitems.val());
          });
        });
        for (var e = 0; e < jogArray.length; e++) {
          if (jogArray[e].socket === socket.id) {
            socket
              .to(array[i].Socket)
              .emit("player-disconnected", {
                socket: socket.id,
                player: jogArray[e].player.uid
              });
            db.ref(
              `conexao/${array[i].ID}/Jogadores/${jogArray[e].ID}`
            ).remove();
          }
        }
      }
    }
  },

  // SINCRONIZAR UM NOVO PLAYER NA "SCREEN"
  async syncConnection(data, socket) {
    // CONECTA COM O FIREBASE
    const db = fb.database();
    // BUSCA A REFERENCIA DO JSON NO FIREBASE
    var array = [];
    var jogarray = [];
    db.ref("conexao/").on("value", snapshot => {
      // MAPEIA TODA A ARRAY RETORNADA
      array = snapshot.val();
    });
    // FAZ UM LOOP
    array.forEach((item)=>{
      // VARIAVEL DE APOIO
      var usucode = parseInt(data.code);
      var dbcode = parseInt(item.Code);
      /*
       * VERIFICA SE O CODIGO DIGITADO PELO O
       * USUARIO BATE COM ALGUM DO BANCO DE DADOS
       */
      if (usucode === dbcode) {
        var iduser = 0;
        // FAZ REFERENCIA DO JSON NO FIREBASE
        db.ref(`conexao/${item.ID}/Jogadores`).once("value", snapshot => {
          // MAPEIA O RETORNO
          snapshot.forEach(item => {
            // ATRIBUI OS ITEM VINDO A UMA VARIAVEL
            iduser++;
            jogarray.push(item.val());
          });
        });
        // VERIFICA SE O SOCKET ID ESTA NESSA VARIAVEL
        var key = parseInt(iduser);

        if (!SExist(jogarray, socket.id)) {
          // SE NÃO ESTIVER ADICIONA ELA
          jogarray.push({ ID: key, player: data.player, socket: socket.id });
          // AI ENVIA PRO BANCO DE DADOS
          db.ref(`conexao/${item.ID}`).update({ Jogadores: jogarray });
          // ENVIA UM SOCKET SÓ PRA QUELE SOCKET COM O EVENTO NEW-PLAYER
          socket
            .to(item.Socket)
            .emit("new-player", { socket: socket.id, player: data.player });
        }
      }
    });
  },
  // BUSCAR O SCREEN ID DE ACORDO COM OS CONTROLES
  async getScreenId(socket, data) {
    const db = fb.database();
    var item = [];
    db.ref("conexao/").once("value", snapshot => {
      item = snapshot.val();
    });
    if (item.length > 0 && item !== "undefinded") {
      for (var i = 0; i < item.length; i++) {
        db.ref(`conexao/${item[i].ID}/Jogadores`).once("value", players => {
          players.forEach(playersitem => {
            if (playersitem.val().socket === socket.id) {
              db.ref(`conexao/${item[i].ID}`).once("value", screenId => {
                socket.emit("screen-id", { screenId: screenId.val().Socket });
              });
            }
          });
        });
      }
    }
  },
  // BUSCAR OS JOGADORES OU CONTROLES CONECTADOS
  async getControllerId(socket, data) {
    const db = fb.database();
    var controllersId = [];
    var item = [];
    var Controllers = [];
    db.ref("conexao/").on("value", snapshot => {
      item = snapshot.val();
    });
    if (item.length > 0 && item !== "undefinded") {
      for (var i = 0; i < item.length; i++) {
        if (item[i].Socket === socket.id) {
          db.ref(`conexao/${item[i].ID}/Jogadores`).once(
            "value",
            controllers => {
              Controllers = controllers.val();
            }
          );
        }
      }
      socket.emit("controllers-ids", Controllers);
    }
  },
  async gameAprove(data, socket) {
    socket.to(socket.id).emit("game-return", { aprove: true });
  }
};

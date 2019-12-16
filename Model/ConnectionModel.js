//        O 
// 		/ | \
//       \ /
const fb = require('../config/firebase');
const CodeAPI = require('../config/code');
module.exports = {
	// ADICIONAR UMA "SCREEN" OU UMA SESSÃO
    setConnectionScreen(socket){
    	// COLOCA O SOCKET ID DENTRO DE UMA VARIAVEL
    	const Socket = socket.id;
    	// COLOCA O CODE DENTRO DE UMA VARIAVEL
    	const Code = CodeAPI.getCode(socket);
    	// CONECTA COM O FIREBASE
        const db = fb.database();
        // DECLARA UM VALOR 0 PARA A VARIAVEL "I";
        var i = -1;
        // FAZ REFERENCIA DO JSON NO FIREBASE
        db.ref('conexao/').on('value',(snapshot)=>{
        	// MAPEIA TUDO
        	snapshot.forEach((item)=>{
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
		const ID = val+1;
		db.ref(`conexao/${ID}`).set({ Game: 'Nenhum',Code,Socket,ID });
		socket.emit('screen-code',{Code});
    },
    // REMOVER UMA "SCREEN" OU SESSÃO INTEIRA
    async removeConnection(socket){
    	// CONECTA COM O FIREBASE
    	const db = fb.database();
    	// VARIAVEL DE APOIO
    	var array = [];
    	var key = [];
    	// FAZ REFERENCIA DO JSON NO FIREBASE
		db.ref('conexao/').once('value', (snapshot)=> {
			// MAPEIA TODA A ARRAY RETORNADA E ATRIBUI NA VARIAVEL DE APOIO
			snapshot.forEach((item)=>{
				// FICA ADICIONANDO TODOS OS ARRAY EM CACHE(OU VARIAVEL)
				array.push(item.val());
			})
		});
		//FAZ UM LOOP NO ARRAY
		for(var i=0; i< array.length; i++){
			/* 
			* VERIFICO CADA UM ATE QUE O VALOR DO SOCKET-ID 
			* SEJA IGUAL A QUAL QUER UM QUE ESTÁ NO BANCO DE DADOS
			*/
			if(array[i].Socket === socket.id){
				// REMOVE A SESSÃO DE ACORDO COM A REFERENCIA
				db.ref(`conexao/${i}/Jogadores`).once('value',(snapshot)=>{
					// MAPEIA TODO O VALOR RETORNADO EM ARRAY
					snapshot.forEach((item)=>{
						// ENVIA UM EVENTO "REMOVE-CONNTECTION" VALENDO TRUE
						socket.to(item.val()).emit('remove-connection',true);
					})
				});
				// REMOVE DE ACORDO COM SEU ID
				db.ref(`conexao/${array[i].ID}`).remove();
			}
		}
    },
    // SINCRONIZAR UM NOVO PLAYER NA "SCREEN"
    async syncConnection(data,socket){
    	// CONECTA COM O FIREBASE
		const db = fb.database();
		// BUSCA A REFERENCIA DO JSON NO FIREBASE
		var array = [];
		var jogarray =[];
		db.ref('conexao/').on('value',(snapshot)=>{
			// MAPEIA TODA A ARRAY RETORNADA
			array = snapshot.val();
		});
		for(var i = 0; i < array.length; i++){
			var usucode = parseInt(data.code);
			var dbcode = parseInt(array[i].Code);
			if(usucode === dbcode){
				db.ref(`conexao/${i}/Jogadores`).once('value',(snapshot)=>{
					snapshot.forEach((item)=>{
						jogarray.push(item.val());
					})
				});
				if(!jogarray.includes(socket.id)){
					jogarray.push(socket.id)
					db.ref(`conexao/${i}`).update({ Jogadores: jogarray });
				}
				socket.to(array[i].Socket).emit('new-player',{socket: socket.id});
			}
			console.log(array[i].ID);
		}
    },
    // BUSCAR O SCREEN ID DE ACORDO COM OS CONTROLES
    async getScreenId(socket){
    	const id = socket.id;
    	const db = fb.database();
    	db.ref('conexao/').on('value',(snapshot)=>{
    		snapshot.forEach(item =>{
    			db.ref(`conexao/${item.key}/Jogadores`).on('value',(players)=>{
		    		players.forEach(playersids =>{
						if(playersids.val() === id){
							socket.to(id).emit('onController',{screenId: item.val().Socket});
						}
					});
		    	});
    		});
    	});
    },
    // BUSCAR OS JOGADORES OU CONTROLES CONECTADOS
    async getControllerId(socket){
    	const { id } = socket;
    	const db = fb.database();
    	var controllersId = [];
    	await db.ref('conexao/').on('value',(snapshot)=>{
    		snapshot.forEach(async (item) =>{
    			if(item.val().Socket === id){
    				await controllersId.push(item.val().Jogadores);
    			}
    		});
    	});
    	console.log(controllersId);
    	socket.to(id).emit('onController',{controllersId});
    },
    async gameAprove(data,socket){
    	socket.to(socket.id).emit('game-return',{aprove:true})
    }
}
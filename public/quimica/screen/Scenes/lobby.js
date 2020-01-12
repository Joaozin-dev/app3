class Lobby extends Phaser.Scene{
    constructor(game){
        super("Lobby");
        this.gameapi = game;
    }
    preload(){}
    create(){
        console.log(this.game);
        this.add.text(100,100,`WAITING FOR PLAYING`,{fontFamily: 'Arial'});
        this.gameapi.onReady((device_id)=>{
          this.gameapi.onPlayerConnect((player_id)=>{
            console.log(`PLAYER {${player_id}} CONECTADO MSG DO LOBBY.JS`);
          });
        });
    }
    update(){}
}

export default Lobby;
let players = 0;
class Lobby extends Phaser.Scene{
    constructor(game){
        super("Lobby");
        this.gameapi = game;
    }
    preload(){}
    create(){
        this.add.text(100,100,`WAITING FOR PLAYING`,{fontFamily: 'Arial'});
        this.gameapi.onReady((device_id)=>{
          this.gameapi.onPlayerConnect((player_id)=>{
            console.log(player_id,"LOBBY")
            players++;
          });
        });
    }
    update(){
      if(players > 0){
        this.scene.start('Fase1');
      }
    }
}

export default Lobby;
class Lobby extends Phaser.Scene{
    constructor(game){
        super("Lobby");
        this.gameapi = game;
    }
    preload(){}
    create(){
        var player = 0;
        console.log(this.game);
        this.add.text(100,100,`WAITING FOR PLAYING`,{fontFamily: 'Arial'});
        this.gameapi.onReady((device_id)=>{
          this.gameapi.onPlayerConnect((player_id)=>{
            console.log(player_id,"LOBBY")
            this.player++;
          });
        });
    }
    update(){
      if(this.player > 0){
        this.scene.start('Fase1');
      }
    }
}

export default Lobby;
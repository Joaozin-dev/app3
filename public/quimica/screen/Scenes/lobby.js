class Lobby extends Phaser.Scene{
    constructor(game){
        super("Lobby");
        this.gameapi = game;
        this.player = 0;
    }
    preload(){}
    create(){
        console.log(this.game);
        this.add.text(100,100,`WAITING FOR PLAYING`,{fontFamily: 'Arial'});
        this.gameapi.onReady((device_id)=>{
          this.gameapi.onPlayerConnect((player_id)=>{
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
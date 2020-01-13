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
            this.scene.start('Fase1');
          });
        });
    }
    update(){}
}

export default Lobby;
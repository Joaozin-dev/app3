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
            this.gameapi.onMessage((controller_id,message)=>{
                if(message.action === 'start'){
                    this.scene.start('Fase1');
                } else if(message.action === 'add_new_player'){
                    alert(`Player: ${message.player}`);
                }
            })
        });
    }
    update(){}
}

export default Lobby;
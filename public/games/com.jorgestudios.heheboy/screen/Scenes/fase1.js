let connected = true;
class Fase1 extends Phaser.Scene{
    constructor(game){
        super("Fase1");
        let player,msg,direction;
        this.gameapi = game;
    }
    preload(){
        this.load.tilemapTiledJSON('mappy','https://airgames.tk/quimica/assets/fase1.json');
        this.load.image('Tileset.v2','https://airgames.tk/quimica/assets/Tileset.v2.png');
        this.load.image('background','https://airgames.tk/quimica/assets/fundo.png');
        this.load.spritesheet('dude', 
            'https://airgames.tk/quimica/assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }
    create(){
        this.gameapi.onPlayerDisconnected(function(player_id){
          connected = false;
        });

        let backgroundImage = this.add.image(0, 0,'background').setOrigin(0, 0);

        this.player = this.physics.add.sprite(50, 248, 'dude');

        this.player.setBounce(0.2);
        
        this.player.setCollideWorldBounds(true);

        let mappy = this.add.tilemap('mappy');

        let terrain = mappy.addTilesetImage('Tileset.v2');

        let basic = mappy.createStaticLayer('basico',[terrain],0,0).setDepth(1);

        this.physics.add.collider(this.player,basic);

        this.player.body.setGravityY(300)

        basic.setCollisionByProperty({collides:true});

        // this.physics.add.existing(basic);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }
    update(){
        let cursors = this.input.keyboard.createCursorKeys();
        if (this.direction === 'left')
        {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.direction === 'right')
        {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }
        if (this.direction === 'jump' && this.player.body.blocked.down)
        {
            this.player.setVelocityY(-230);
        }
        if(!connected){
          this.scene.start('Lobby');
        }
        this.fall(this.player,this.scene);
    }
    fall(player,scene){
        if(player.y >= 560){
            scene.pause();
            this.add.text(350,500,'Você morreu :(');
            setTimeout(()=>{
                this.scene.start('Lobby');
            },1000);
        }
    }
}
export default Fase1;
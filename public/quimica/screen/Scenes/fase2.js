class Fase2 extends Phaser.Scene{
    constructor(game){
        super("Fase2");
        let player;
        this.game = game;
    }
    preload(){
        this.load.tilemapTiledJSON('mappy','http://localhost:3000/quimica/assets/fase2.json');
        this.load.image('Tileset','http://localhost:3000/quimica/assets/Tileset.v2.png');
        this.load.image('background','http://localhost:3000/quimica/assets/foto.jpg');
        this.load.spritesheet('dude', 
            'http://localhost:3000/quimica/assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }
    create(){

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
        if (cursors.left.isDown)
        {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }
        if (cursors.up.isDown && this.player.body.blocked.down)
        {
            this.player.setVelocityY(-230);
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

export default Fase2;
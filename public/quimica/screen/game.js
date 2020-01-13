// IMPORTAR FASES INCLUSIVE O LOBBY
import Lobby from '/quimica/screen/Scenes/lobby.js';
import Fase1 from '/quimica/screen/Scenes/fase1.js';
import Fase2 from '/quimica/screen/Scenes/fase2.js';
// IMPORTAR API DO "HEHE BOY PROJECT"
import { ScreenAPI } from 'https://airgames.tk/quimica/apis/gameapi.js';
// INSTANCIAR A SCREEN
var screen = new ScreenAPI();

// IMPORTAR API DE ADS
import Ads from '/quimica/screen/ads.js';
// INSTANCIAR TODAS AS FASES DO JOGO PASSANDO COMO PARAMETRO SCREEN
const lobby = new Lobby(screen);
const fase1 = new Fase1(screen);
const fase2 = new Fase2(screen);

var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 604,
    backgroundColor: '#2d2d2d',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [lobby,fase1,fase2]
};

var game = new Phaser.Game(config);
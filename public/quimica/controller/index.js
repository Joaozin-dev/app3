import { ControllerAPI } from '/quimica/apis/gameapi.js';

var game = new ControllerAPI();

document.getElementById('controls').style.display = 'none';
var connect = false;

const btnsend = document.getElementById('send');

btnsend.addEventListener('click',()=>{
	game.onReady((device_id)=>{
		game.sendMessage(device_id,{action:'start'});
	})
})
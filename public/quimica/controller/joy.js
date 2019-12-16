import { ControllerAPI } from '/quimica/apis/gameapi.js';

var control = new ControllerAPI();

var leftBtn_P1 = document.getElementById("p1-left");

leftBtn_P1.addEventListener("touchstart",function(){
	// console.log(e);
	console.log("HELLO");
});
leftBtn_P1.addEventListener("touchend",function(){
	console.log("WORLD");
});
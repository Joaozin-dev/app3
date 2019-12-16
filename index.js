const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const cors = require('cors');

const routes = require('./routes');

app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'Views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');

app.use(cors());
app.use(routes);

const CM = require('./Model/ConnectionModel');

io.on('connect',(socket)=>{
	socket.on('join',async (data)=>{
		if(data.type === 'screen'){
			await CM.setConnectionScreen(socket);
		}
		console.log(data);
	});
	socket.on('new-controller',(data)=>{
		console.log(data);
		CM.syncConnection(data,socket);
	})
	socket.on('disconnect', () => {
		CM.removeConnection(socket);
	});
	// 	QUANDO A TELA ENVIA PARA O CONTROLE A MENSSAGEM
	socket.on('screen-controller',(data)=>{
		const {device_id,msg} = data;
		socket.to(device_id).emit('controller-screen',msg);
		console.log(`Menssagem do screen-controller(${JSON.stringify(data.device_id)}): ${JSON.stringify(data.msg)}`);
	});

	// 	QUANDO O CONTROLE ENVIA PARA A TELA A MENSSAGEM
	socket.on('controller-screen',(data)=>{
		const {device_id,msg} = data;
		socket.to(device_id).emit('screen-controller',msg);
		console.log(`Menssagem do controller-screen(${JSON.stringify(data.device_id)}): ${JSON.stringify(data.msg)}`);
	});
	// QUANDO O RETORNAR OS CONTROLES CONECTADOS
	socket.on('getController',(data)=>{
		console.log(data);
		if(data.controllerId !== undefined){
			CM.getScreenId(socket);
		} else if (data.screenId !== undefined){
			CM.getControllerId(socket);
		}
	});
	// ENVIAR O CÓDIGO DO CONTROLE
	socket.on('game',(data)=>{
		CM.gameAprove(data,socket);
	});
});

server.listen(3000,()=>{
    console.log("SERVIDOR LIGADO NÁ PORTA 3000");
});
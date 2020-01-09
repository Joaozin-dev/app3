class ScreenAPI {
	constructor(){
		this.socket = window.parent.hello();
	}
	// METODO PARA VERIFICAR SE ESTÁ TUDO CONECTADO
	onReady(f){
		if(this.socket.connected){
			f(this.socket.id);
		}
	}
	// METODO PARA ENVIAR UMA MENSSAGEM DE ACORDO COM SEU ID SOCKET(device_id)
	sendMessage(device_id,msg){
		this.socket.emit('screen-controller',{device_id,msg});
	}
	// METODO PARA ESCUTAR UMA MENSSAGEM E RETORNAR SUA MENSSAGEM E SEU ID
	onMessage(f){
		this.socket.on('controller-screen',(data)=>{
			return f(data.device_id,data.msg);
		});
	}
	// METODO PARA VERIFICAR SE O JOGADOR CONECTOU
	onPlayerConnect(f){
		this.socket.on('new-player',(data)=>{
			f(data.socket);
		});
	}
	// METODO PARA VERIFICAR SE O JOGADOR DESCONECTOU
	onPlayerDisconnected(f){
		this.socket.on('player-disconnected',(data)=>{
			f(data.socket);
		});
	}
	getControllers(){
		var connect = this.socket;
		return {
			id(screenId){
				const array = [];
				connect.on('controllers-ids',function(data){
					array = data.controllersId;
				});
				connect.emit('getController',true);
				setTimeout(()=>{
					return array;
				},800);
			}
		}
	}
}




class ControllerAPI {
	constructor(){
		this.socket = window.parent.hello();
	}
	// METODO PARA VERIFICAR SE ESTÁ TUDO CONECTADO
	onReady(f){
		if(this.socket.connected){
			f(this.socket.id);
		}
	}
	// METODO PARA ENVIAR UMA MENSSAGEM DE ACORDO COM SEU ID SOCKET(device_id)
	sendMessage(device_id,msg){
		this.socket.emit('controller-screen',{device_id,msg});
	}
	// METODO PARA ESCUTAR UMA MENSSAGEM E RETORNAR SUA MENSSAGEM E SEU ID
	onMessage(f){
		this.socket.on('screen-controller',(data)=>{
			return f(data.device_id,data.msg);
		});
	}
	// METODO PARA VERIFICAR SE O JOGADOR ESTA DESCONECTADO
	onPlayerDisconnected(f){
		this.socket.on('player-disconnected',(data)=>{
			f(data.socket);
		})
	}
	// METODO PARA VERIFICAR SE O JOGADOR CONECTOU
	onPlayerConnect(f){
		this.socket.on('new-player',(data)=>{
			f(data.socket);
		});
	}
	getControllers(){
		var connect = this.socket;
		return {
			id(screenId){
				const array = [];
				connect.on('screen-id',function(data){
					array = data.controllersId;
				});
				connect.emit('getScreen',true);
				setTimeout(()=>{
					return array;
				},800);
			}
		}
	}
}

export {ScreenAPI,ControllerAPI};
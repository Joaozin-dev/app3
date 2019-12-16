class ScreenAPI {
	constructor(width,height){
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
	getControllers(){
		var connect = this.socket;
		return {
			id(screenId){
				const array = [];
				connect.on('onController',(data)=>{
					array = data.controllersId;
				});
				connect.emit('getController', {screenId})
				setTimeout(async()=>{
					return await array;
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
	getControllers(){
		var connect = this.socket;
		return {
			id(screenId){
				const array = [];
				connect.on('onController',(data)=>{
					array = data.controllersId;
				});
				connect.emit('getController', {screenId})
				setTimeout(async()=>{
					return await array;
				},800);
			}
		}
	}
}
export {ScreenAPI,ControllerAPI};
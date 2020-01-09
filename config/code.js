module.exports = {
	getCode(socket){
		const code = Math.floor(Math.random()*10000-1);
		socket.emit('con',{code});
		return code;
	}
};
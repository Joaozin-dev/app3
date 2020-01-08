function socketExist(arr,socket){
	return arr.some(function(el){
		return el.socket === socket;
	})
}

module.exports =  socketExist;

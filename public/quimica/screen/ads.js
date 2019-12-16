class Ads {
	constructor(scene,add,fase){
		const random = Math.floor(Math.random()*1000000-1);
		if(random === 25 || random === 89){
			scene.pause();
			add.text(16,16,'Ads do jogo');
			setTimeout(()=>{
				scene.resume(fase);
				ads.setItem('ads',true);
			},1000*5);
		}
	}
}

export default Ads;
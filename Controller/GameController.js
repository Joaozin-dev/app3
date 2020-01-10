const GameModel = require('../Model/GameModel');

module.exports = {
  index(req,res){
    GameModel.findAll({
      attributes: ['game_id','game_name','game_picture','game_description','game_last_update','game_price']
    }).then((query)=>{
      const data = JSON.parse(JSON.stringify(query));
      res.json(data);
    });
  },
  show(req,res){
    const id = parseInt(req.params.id);
    GameModel.findAll({
      attributes: ['game_id','game_name','game_picture','game_description','game_last_update','game_price','game_video']
    }).then((query)=>{
      const data = JSON.parse(JSON.stringify(query));
      data.forEach(item=>{
        if(item.game_id === id){
          res.render("pages/info.html",item);
        }
      });
    });
  }
}
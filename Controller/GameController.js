const GameModel = require('../Model/GameModel');

module.exports = {
  index(req,res){
    GameModel.findAll({
      attributes: ['game_name','game_picture','game_description','game_last_update']
    }).then((query)=>{
      const data = JSON.parse(JSON.stringify(query));
      res.json(data);
    });
  }
}
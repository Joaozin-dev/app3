const GameModel = require('../Model/GameModel');

module.exports = {
  index(req,res){
    GameModel.findAll({
      attributes: ['facebook_id','user_nome','user_email','user_picture']
    }).then((query)=>{
      const data = JSON.parse(JSON.stringify(query));
      
    });
  }
}
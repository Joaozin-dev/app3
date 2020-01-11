const HistoricModel = require("../Model/HistoricModel");
const UserModel = require("../Model/UserModel");
const GameModel = require("../Model/GameModel");
module.exports = {
  async show(req, res) {
    const userID = parseInt(req.params.id);
    var historic = [];
    HistoricModel.findAll({
      attributes: ["usuarios_user_id", "games_game_id"]
    }).then(query => {
      const historics = JSON.parse(JSON.stringify(query));
      for (var i = 0; i < historics.length; i++) {
        if (historics[i].usuarios_user_id === userID) {
          historic.push(historics[i]);
        }
        GameModel.findAll({
          attributes: [
            "game_id",
            "game_name",
            "game_picture",
            "game_description",
            "game_last_update",
            "game_price",
            "game_video"
          ]
        }).then(query => {
          const data = JSON.parse(JSON.stringify(query));
          for(var g = 0; g < data.length; g++){
            for(var j = 0; j < historic.length; j++){
              if(historic[j].games_game_id === data[g].game_id){
                console.log(data[g]);
              }
            }
          }
        });
      }
      res.json({ historic });
    });
  }
};

const HistoricModel = require("../Model/HistoricModel");
const UserModel = require("../Model/UserModel");
const GameModel = require("../Model/GameModel");
module.exports = {
  async show(req, res) {
    const userID = parseInt(req.params.id);
    var  = [];
    HistoricModel.findAll({
      attributes: ["usuarios_user_id", "games_game_id"]
    }).then(query => {
      const historics = JSON.parse(JSON.stringify(query));
      for(var i = 0; i < historics.length; i++){
        res.
      }
    });
  }
};

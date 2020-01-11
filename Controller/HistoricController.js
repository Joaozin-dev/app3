const HistoricModel = require("../Model/HistoricModel");
const UserModel = require("../Model/UserModel");
const GameModel = require("../Model/GameModel");
module.exports = {
  async show(req, res) {
    const userID = parseInt(req.params.id);
    var historic = [];
    var response = {};
    HistoricModel.findAll({
      attributes: ["usuarios_user_id", "games_game_id"]
    }).then(query => {
      const historics = JSON.parse(JSON.stringify(query));
      for (var i = 0; i < historics.length; i++) {
        if (historics[i].usuarios_user_id === userID) {
          historic.push(historics[i]);
        }
        var games = [];
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
          for (var g = 0; g < data.length; g++) {
            console.log(historics[i]);
            if (historics[i].games_game_id === data[g].game_id) {
              games.push(data[g]);
            }
            response = { ...response, games };
          }
        });
        UserModel.findAll({
          attributes: [
            "user_id",
            "user_nome",
            "user_email",
            "user_picture",
            "user_cash"
          ]
        }).then(query => {
          const users = JSON.parse(JSON.stringify(query));
          users.forEach(user => {
            if (user.user_id === userID) {
              response = { ...response, user };
            }
          });
          res.json(response);
        });
      }
    });
  }
};

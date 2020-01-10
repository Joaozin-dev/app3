const HistoricModel = require("../Model/HistoricModel");
const UserModel = require("../Model/UserModel");
const GameModel = require("../Model/GameModel");
const axios = require("axios");
module.exports = {
  async show(req, res) {
    const userID = parseInt(req.params.id);
    var response = null;
    HistoricModel.findAll({
      attributes: ["usuarios_user_id", "games_game_id"]
    }).then(query => {
      const users = JSON.parse(JSON.stringify(query));
      users.forEach(item => {
        console.log(item);
        if (item.usuarios_user_id === userID) {
          UserModel.findAll({
            attributes: [
              "user_id",
              "facebook_id",
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
          });
          GameModel.findAll({
            attributes: [
              "game_id",
              "game_name",
              "game_picture",
              "game_description",
              "game_last_update",
              "game_price"
            ]
          }).then(query => {
            const users = JSON.parse(JSON.stringify(query));
            users.forEach(user => {
              if (user.user_id === userID) {
                response = { ...response, user };
              }
            });
          });
        } else {
        }
      });
    });
    res.json(response);
  }
};

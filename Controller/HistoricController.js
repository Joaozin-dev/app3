const HistoricModel = require("../Model/HistoricModel");
const UserModel = require("../Model/UserModel");
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
              "facebook_id",
              "user_nome",
              "user_email",
              "user_picture",
              "user_cash"
            ]
          }).then(query => {
            const users = JSON.parse(JSON.stringify(query));
            console.log(query);
          });
        } else {
        }
      });
    });
    res.json(response);
  }
};

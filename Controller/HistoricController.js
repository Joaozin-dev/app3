const HistoricModel = require("../Model/HistoricModel");
const UserModel = require("../Model/UserModel");
const GameModel = require("../Model/GameModel");
module.exports = {
  async show(req, res) {
    const userID = parseInt(req.params.id);
    var response = null;
    HistoricModel.findAll({
      attributes: ["usuarios_user_id", "games_game_id"]
    }).then(query => {
      const historics = JSON.parse(JSON.stringify(query));
      historics.forEach(historic => {
        console.log(historic);
        if (historic.usuarios_user_id === userID) {
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
                response = {
                  ...response,
                  user:{
                    id: user.user_id,
                    name: user.user_nome,
                    email: user.user_email,
                    picture: user.user_picture
                  }
                }
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
            const games = JSON.parse(JSON.stringify(query));
            var i = 0;
            var gamess = [];
            games.forEach(game =>{
              if(game.game_id === historic.games_game_id){
                gamess.push(game);
              }
            });
            console.log(gamess[1]);
            res.json({...response,gamess});
          });
        } else {
        }
      });
    });
  }
};

const { sql, Sequelize } = require("../connec-sql.js");

const User = sql.define("historic", {
  historic_id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: true
  },
  usuarios_user_id: Sequelize.INTEGER,
  games_game_id: Sequelize.INTEGER
});

module.exports = User;

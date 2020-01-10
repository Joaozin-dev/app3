const { sql, Sequelize } = require("../connec-sql.js");

const User = sql.define("games", {
  game_id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: true
  },
  game_name: Sequelize.STRING,
  game_description: Sequelize.STRING,
  game_picture: Sequelize.STRING,
  game_last_update: Sequelize.DATE,
  game_developer_id: Sequelize.INTEGER,
  game_price: Sequelize.INTEGER
});

module.exports = User;

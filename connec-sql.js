const Sequelize = require("sequelize");

const sql = new Sequelize("eshYZXi5LM", "eshYZXi5LM", "v96Bgs6sBK", {
  host: "remotemysql.com",
  dialect: "mysql",
  define: {
    timestamps: false
  }
});

module.exports = {
  Sequelize,
  sql
};

const Sequelize = require("sequelize");

const sql = new Sequelize("eshYZXi5LM", "eshYZXi5LM", "PU42MkVSwy", {
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

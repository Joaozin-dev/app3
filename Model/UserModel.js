const {sql,Sequelize} = require('../connec-sql.js');

const User = sql.define('usuarios',{
    user_id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: true
    },
    user_email:Sequelize.STRING,
    user_senha:Sequelize.STRING,
    user_nome:Sequelize.STRING,
    user_picture:Sequelize.STRING,
    facebook_id: Sequelize.STRING
})

module.exports = User;
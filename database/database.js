const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");

const connection = new sequelize('ProjetoBlog','root','zmhx8wqc',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = connection;
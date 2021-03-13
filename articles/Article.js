const Sequelize = require ("sequelize");
const connection = require("../database/database.js");
const Category = require("../categories/Category.js");
//fazer o relacionamento entre Articles e Categories

const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }

});

Category.hasMany(Article); // relacionamento 1 -> N 1 artigo tem varias categorias
Article.belongsTo(Category); //relacionamento 1 -> 1

// Article.sync({force: true}); //atualiza tabelas e relacionamentos, fazer isso em todos os Models (Categorie & Article), depois tirar

module.exports = Article;
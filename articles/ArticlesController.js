const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article"); //model do banco
const slugify = require("slugify");

router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{ model: Category }]
    }).then(articles => {  //metodo sequelize de query com o include que seria o join, ja que fora settado no model a dependencia das tabelas
        res.render("admin/articles/index", { articles: articles })
    });
});

router.post("/articles/delete", (req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles");
            });
        } else {
            res.redirect("/admin/articles");
        }
    } else {
        res.redirect("/admin/articles");
    }
});

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", { categories: categories })
    });
});

router.post("/articles/save", (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    // categoryId é a forein key
    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect("/admin/articles");
    });
});

router.get("/admin/articles/edit/:id", (req, res) => {
    var id = req.params.id;
    Article.findByPk(id).then(article => {
        if (article != undefined) {  //haja vista na view edit haver sido listadas as categorias, é necessario passa-las por aqui tb
            Category.findAll().then(categories => {
                res.render("admin/articles/edit", { categories: categories, article: article })
            });
        } else {
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });
});

router.post("/articles/update", (req, res) => {  //pega-se pelos names nas tags
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;


    Article.update({ title: title, body: body, categoryId: category, slug: slugify(title) }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/articles");
    }).catch(err => {
        res.redirect("/");
    });
});

router.get("/article/:num", (req,res) => {
    var page = req.params.num;
    var offset =0; 

    if(isNaN(page) ){
        offset=0;
    }

    Article.findAndCountAll({
        limit: 4,
        offset: 10
    }).then( articles => {
        res.json(articles);
    })
})

module.exports = router;
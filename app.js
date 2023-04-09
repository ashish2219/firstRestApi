const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

// Request targeting all articles.

app.route("/articles").get(
    async function (req, res) {
        try {
            const foundArticles = await Article.find();
            res.send(foundArticles);
        } catch (err) {
            res.send(err);
        }
    }
).post(
    async function (req, res) {
        try {
            const newArticle = new Article({
                title: req.body.title,
                content: req.body.content
            });
            await newArticle.save();
            res.send("Successfully added new article.");
        } catch (err) {
            res.send(err);
        }
    }
).delete(
    async function (req, res) {
        try {
            await Article.deleteMany();
            res.send("Successfully deleted all the articles.");
        } catch (err) {
            res.send(err);
        }
    }
);

// app.get("/articles", function (req, res) {
//     Article.find(function (err, foundArticles) {
//         console.log(foundArticles);
//     });
// }); This find method is deprecated can be applied with async await fucntion



// app.post("/articles", function (req, res) {

//     const newArticle = new Article({
//         title: req.body.title,
//         content: req.body.content
//     });

//     newArticle.save(function (err) {
//         if (!err) {
//             res.send("Successfully added new article.");
//         } else {
//             res.send(err);
//         }
//     });
// }) here the Model.prototype.save() no longer accepts a callback. So i fixed it using async await function.

// Request targeting a specific article.

app.route("/articles/:articleTitle").get(async function (req, res) {
    try {
        const foundArticle = await Article.findOne({ title: req.params.articleTitle });
        res.send(foundArticle);
    } catch (err) {
        res.send("No articles matching that title was found");
    }
}).put(async function (req, res) {
    try {
        const replacedArticle = await Article.findOneAndReplace(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content },
            { overwrite: true, new: true }
        );
        res.send("Successfully replaced the article");
    } catch (err) {
        res.send(err);
    }
}).patch(async function (req, res) {
    try {
        const updatedArticle = await Article.findOneAndUpdate(
            { title: req.params.articleTitle },
            { $set: req.body }
        );
        res.send("Successfully updated the article");
    } catch (err) {
        res.send(err);
    }
}).delete(async function (req, res) {
    try {
        const selectedDelete = await Article.findOneAndDelete(
            { title: req.params.articleTitle }
        );
        res.send("Successfully deleted the selected article.");
    } catch (err) {
        res.send(err);
    }
});


app.listen(3000, function () {
    console.log("Server started on port 3000");
})

const functions = require('../functions');
const {Client} = require('pg');
const client = new Client({
    "user": "postgres",
    "password": "password",
    "host": "localhost",
    "port": "5432",
    "database": "teamwork",
});

client.connect();

exports.addArticleComment = (req, res, next) => {
    const text = `INSERT INTO articleComments (comment, createdOn, articleId) 
    VALUES($1, (SELECT date_trunc('second', now()::timestamp)), (SELECT id FROM articles WHERE id = ${req.params.articleId} ))`;
    const values = [
        req.body.comment
    ];
    client.query(text, values).then(()=>{
        res.json({
            status:'Success',
            message : "Comment added",
            createdOn : functions.time(),
            comment: req.body.comment
        })
    }).catch(()=>{
        res.json({
            status:'Error',
            message: "Unable to add comment"
        })
    })
}



exports.addGifComment = (req, res, next) => {
    const text = `INSERT INTO gifComments (comment, createdOn, gifId) 
    VALUES($1, (SELECT date_trunc('second', now()::timestamp)), (SELECT id FROM gifs WHERE id = ${req.params.gifId} ))`;
    const values = [
        req.body.comment
    ];
    client.query(text, values).then(()=>{
        res.json({
            status:'Success',
            message : "Comment added",
            createdOn : functions.time(),
            comment: req.body.comment
        })
    }).catch(()=>{
        res.json({
            status:'Error',
            message: "Unable to add comment"
        })
    })
}
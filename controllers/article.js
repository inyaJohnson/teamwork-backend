const functions = require('../functions');
const {Client} = require('pg');
const client = new Client({
    "user": "postgres",
    "password": "password",
    "host": "localhost",
    "port": "5432",
    "database": "teamwork"
});

client.connect();

exports.getAllArticle = (req, res, next) =>{
    const text = `SELECT * FROM articles`;
    client.query(text).then((result)=>{
        const articles = result.rows;
        res.json({
            status:'Success',
            data:{
                articles
            }  
        })
    }).catch(()=>{
        res.json({
            status: 'Error',
            message : 'Unable to get Articles'
        })
    })
}

exports.addArticle = (req, res, next) => {
    const text = `INSERT INTO articles (title, article, category, createdOn, userId) VALUES($1, $2, $3, (SELECT date_trunc('second', now()::timestamp)), 
    (SELECT id FROM users WHERE id = ${req.specialData .userId}))`;
   
    const values = [
        req.body.title,
        req.body.article,
        req.body.category,
    ];

    client.query(text, values).then(()=>{
        res.json({
            status:'Success',
            data:{
                message : 'Article successfully posted',
                createdOn: functions.time(),
                title: req.body.title
            }
        })
    }).catch(()=>{
        res.json({
            status:'Error',
            message: 'Unable to post article'
        })
    })
}

exports.updateArticle = (req, res, next) => {
    const text = `UPDATE articles SET title =$1, article = $2, category = $3, 
    userId = (SELECT id FROM users WHERE id = ${req.specialData.userId}) WHERE id = ${req.params.id}`;
    const values = [
        req.body.title,
        req.body.article,
        req.body.category,
    ];

    client.query(text, values).then(()=>{
        res.json({
            status:'Success',
            message : 'Article successfully updated',
            title: req.body.title,
            article: req.body.article,
        })
    }).catch(()=>{
        res.json({
            status:404,
            description: "Unable to update article"
        })
    })
}

exports.deleteArticle = (req, res, next) => {
    const text = `DELETE from articles where id = $1`; 
    const values = [
        req.params.id
    ];
    client.query(text, values).then(()=>{
        res.json({
            status:'Success',
            message : 'Article successfully deleted'
        })
    }).catch(()=>{
        res.json({
            status:'Error',
            message: "Unable to delete Article"
        })
    })
}


exports.getOneArticle = (req, res, next) =>{
    const text = `SELECT * FROM articles WHERE id = ${req.params.id}`;
    client.query(text).then((result)=>{
        const articles = result.rows;
        if(articles.length > 0){
            res.json({
                status:'Successs',
                data:{
                    articles
                }
            })
        }else{
            exit;
        }
    }).catch(()=>{
        res.json({
            status: 'Error',
            message : 'Articles does not exist'
        })
    })
}


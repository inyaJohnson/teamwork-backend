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

exports.getAll = (req, res, next) =>{
    const text = `SELECT id, createdOn, title, imageUrl as article_url, userId FROM gifs 
    UNION 
    SELECT id, createdOn, title, article as article_url, userId FROM articles 
    ORDER BY createdOn DESC`;
    client.query(text).then((result)=>{
        const results = result.rows;
        res.json({
            status:'Success',
            data:{
                results
            }  
        })
    }).catch(()=>{
        res.json({
            status: 'Error',
            message : 'Unable to get Gifs'
        })
    })
}

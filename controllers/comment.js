const {Client} = require('pg');
const client = new Client({
    "user": "postgres",
    "password": "password",
    "host": "localhost",
    "port": "5432",
    "database": "postgres",
});

client.connect();

exports.addComment = (req, res, next) => {
    const text = `INSERT INTO comment (comment, created_at, article_id) 
    VALUES($1, now(), (SELECT id FROM article WHERE id = ${req.params.id} ))`;
    const values = [
        req.body.comment
    ];
    client.query(text, values).then(()=>{
        res.json({
            status:201,
            description : "Comment added"
        })
    }).catch(()=>{
        res.json({
            status:404,
            description: "Unable to add comment"
        })
    })
}
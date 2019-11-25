const {Client} = require('pg');
const client = new Client({
    "user": "postgres",
    "password": "password",
    "host": "localhost",
    "port": "5432",
    "database": "postgres"
});

client.connect();

exports.getAllArticle = (req, res, next) =>{
    const text = "SELECT * FROM article";
    client.query(text).then((result)=>{
        const articles = result.rows;
        res.json({
            status:200,
            articles
        })
    }).catch(()=>{
        res.json({
            status: "404",
            description : "Not Found"
        })
    })
}

exports.addArticle = (req, res, next) => {
    const text = `INSERT INTO article (article, category, employee_id) VALUES($1, $2, (SELECT id FROM employee WHERE id = ${req.specialData.userId}))`;
    const values = [
        req.body.article,
        req.body.category,
    ];
    client.query(text, values).then(()=>{
        res.json({
            status:201,
            description : "Article added"
        })
    }).catch(()=>{
        res.json({
            status:404,
            description: "Unable to add article"
        })
    })
}

exports.updateArticle = (req, res, next) => {
    const text = `UPDATE article SET article = $1, category = $2, 
    employee_id = (SELECT id FROM employee WHERE id = ${req.specialData.userId}) WHERE id = ${req.params.id}`;
    console.log(req.specialData.userId);
    const values = [
        req.body.article,
        req.body.category
    ];
    client.query(text, values).then(()=>{
        res.json({
            status:201,
            description : "Article Updated"
        })
    }).catch(()=>{
        res.json({
            status:404,
            description: "Unable to update article"
        })
    })
}

exports.deleteArticle = (req, res, next) => {
    const text = "DELETE from where id = $1"; 
    const values = [
        req.params.id
    ];
    client.query(text, values).then(()=>{
        res.json({
            status:200,
            description : "Article deleted"
        })
    }).catch(()=>{
        res.json({
            status:404,
            description: "Unable to delete article"
        })
    })
}


exports.getOneArticle = (req, res, next) =>{
    const text = `SELECT * FROM article WHERE id = ${req.params.id}`;
    client.query(text).then((result)=>{
        const articles = result.rows;
        res.json({
            status:200,
            articles
        })
    }).catch(()=>{
        res.json({
            status: "404",
            description : "Not Found"
        })
    })
}

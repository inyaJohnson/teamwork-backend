const {Client} = require('pg');
const connectionString = 'postgressql://postgres:password@localhost:5432/teamwork';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const client = new Client({
    connectionString:connectionString
})

client.connect()


exports.signUp = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10).then((hash) =>{
        const text = "INSERT INTO admin(userName, password) VALUES($1, $2)";
        const values = [
            req.body.userName,
            hash,
        ];
        client.query(text,values).then(() => {
            res.json({
                status : 201,
                message: 'User Created'
            })
        }).catch(error =>{
            res.json({
                status : 500,
                error
            })
        })
    }).catch(error => {
        res.json({
            status : 500,
            error : "Bcrypt hashing"
        })
    })
}


exports.login = (req, res, next)=>{
    const text = "SELECT * FROM admin WHERE userName = $1";
    const values = [
        req.body.userName
    ]
    client.query(text, values).then((user) =>{
        if(!user.rows){
            res.json({
                status : 404,
                message: 'User does not exist'
            })
        }
        const admin = user.rows[0];
        bcrypt.compare(req.body.password, admin.password ).then((valid) =>{
            if(!valid){
                res.json({
                    status : 404,
                    message: 'Invalid password'
                })
            }
            const token = jwt.sign({userId : admin.id}, 'RANDOM_TOKEN_SECRET', {expiresIn:'24h'});

            res.json({
                status : 200,
                userId: admin.id,
                token
            })
        }).catch((error) =>{
            res.json({
                status : 404,
                error
            })
        })
    }).catch((error) =>{
        res.json({
            status : 404,
            error
        })
    })
}
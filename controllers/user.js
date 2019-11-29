const {Client} = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const client = new Client({
    "user" : "postgres",
    "password" : "password",
    "host": "localhost",
    "port": "5432",
    "database": "teamwork"
})

client.connect();

exports.getAllUsers = (req, res, next) =>{
    const text = 'SELECT * FROM users';
    client.query(text).then((result) =>{
        res.json({
            status: 'Success',
            data : result.rows
        })
    }).catch(()=>{
        res.json({
            status: 'error',
            message:'Unable to get users list'
        })
    })
}

exports.addUser = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10).then((hash) =>{
        const text = `INSERT INTO users(firstName, lastName, email, password, gender, jobRole, department, address) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)`;
        const values = [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            hash,
            req.body.gender,
            req.body.jobRole,
            req.body.department,
            req.body.address
        ];
        client.query(text, values).then(() => { 
            res.json({
                status : 'Success',
                data : {
                    message:'User account successfully created',
                    token:req.specialData.token,
                    userId: req.specialData.userId
                }
            })
        })
        .catch(() =>{
            res.json({
                status : 'Error',
                Message : 'Unable to add new User, email might already exist',
            }) 
        })   
    }).catch(() =>{
        res.json({
            status: 'Error',
            description: 'Unable to encode password',
        })
    })

}

exports.deleteUser = (req, res, next) =>{
    const text = `DELETE FROM users WHERE id = $1`;
    const article = `DELETE FROM articles WHERE userId = $1`;
    const values = [
        req.params.id
    ]
    client.query(article, values);
    client.query(text, values).then(() => {
        res.json({
            status : 'Success',
            message :'Employee and Associated Articles has been deleted successfully',   
        })
    }).catch(() =>{
        res.json({
            status : 'Error',
            message :'Unable to delete employee'
        })
    })
    
}

exports.getOneUser = (req, res, next) =>{
    const text = `SELECT * FROM users WHERE id = $1`
    const values = [
        req.params.id
    ];
    client.query(text, values).then((result) => {
        res.json({
            status: 'Success',
            data : result.rows
        })
    }).catch(()=>{
        res.json({
            status: 'error',
            message:'User does not list'
        })
    })
}

exports.updateUser = async (req, res, next) =>{
    const text = `UPDATE users SET firstName = $1, lastName = $2, email = $3, gender = $4, 
    jobRole = $5, department = $6, address = $7 WHERE id = $8`
    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.gender,
        req.body.jobRole,
        req.body.department,
        req.body.address,
        req.params.id
    ]
    client.query(text, values).then(() => {
        res.json({
            status : 'Success',
            message : 'Updated Successfully'
        })
        
    }).catch(()=>{
        res.json({
            status : 'Error',
            message : 'Update Failed'
        })
    })
}

exports.signIn = (req, res, next) => {
    const text = `SELECT * FROM users WHERE email = $1`;
    const values = [
        req.body.email
    ]
    client.query(text, values).then((result) =>{
        if(!result){
            res.json({
                status: 'Error',
                message: 'User does not exist'
            })
        }
        const employee = result.rows[0];
        bcrypt.compare(req.body.password, employee.password).then((valid) =>{
            if(!valid){
                res.json({
                    status : 'Error',
                    message :'Unauthorized'
                })
            }
            const token = jwt.sign({userId : employee.id}, 'RANDOM_TOKEN_SECRET', {expiresIn:'24h'});

            res.json({
                status : 'Success',
                userId: employee.id,
                token
            })

        }).catch(()=>{
            res.json({
                status : 'Error',
                message: 'Missing Parameter'
            })
        })
    })
    .catch(() =>{
        res.json({
            status : 'Error',
            message: 'User does not exist',
        })
    })
}
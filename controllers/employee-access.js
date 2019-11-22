const {Client} = require('pg');
const connectionString = "postgressql://postgres:password@localhost:5432/postgres";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const client = new Client({
    connectionString
})

client.connect();

exports.login = (req, res, next) => {
    const text = "SELECT * FROM employee WHERE name = $1";
    const values = [
        req.body.name
    ]
    client.query(text, values).then((employee) =>{
        if(!employee){
            res.json({
                status: 401,
                description: "Employee Does not exist"
            })
        }
        const employee = employee.rows[0];
        
    })
    .catch((error) =>{
    })
}
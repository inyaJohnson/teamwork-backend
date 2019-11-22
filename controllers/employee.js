const {Client} = require('pg');
const connectionString = 'postgressql://postgres:password@localhost:5432/postgres';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const client = new Client({
    connectionString:connectionString
})

async function start(){
    await connect();
}

async function connect(){
    try{
        client.connect()
    }catch(e){
     return {
         e
     }
    }
}


async function read(){
    try{
        const results = await client.query('SELECT * FROM employee');
        return results.rows;
    }catch(e){
        return [];
    } 
}

// async function add(values){
//     const text = "INSERT INTO employee(email, department, password) VALUES($1, $2, $3)";
//     const result = await client.query(text, values);
//     return result;
// }

async function remove(id){
    const result = await client.query(`DELETE FROM employee WHERE id = ${id}`);
    return result;
}

async function readOne(id){
    const results = await client.query(`SELECT * FROM employee WHERE id = ${id}`);
    return results.rows;
}


async function update(id, values){
    const text = `UPDATE employee SET email = $1, department = $2 WHERE id = ${id}`;
    const result = await client.query(text, values);
    return result;
}

start();

exports.getAllEmployee = async (req, res, next) =>{
    const row = await read();
    let result = {};
    if(row.length > 0){
        result.status = 200;
        result.description = `All avaliable Employee`;
        result.data = row;
    }else{
        result.status = 404;
        result.description =  'No employee';
    }
    res.json(result)
}

exports.addEmployee = async (req, res, next) =>{
    bcrypt.hash(req.body.password, 10).then((hash) =>{
        const text = "INSERT INTO employee(email, department, password) VALUES($1, $2, $3)";
        const values = [
            req.body.email,
            req.body.department,
            hash
        ];
        client.query(text, values).then(() => { 
            res.json({
                status : 200,
                description :'New employee successfully added',
            })
        })
        .catch(() =>{
            res.json({
                status : 404,
                description : 'Unable to add new employee',
            }) 
        })   
    }).catch(() =>{
        res.json({
            status: 500,
            description: "Unable to encode password",
        })
    })

}

exports.deleteEmployee = async (req, res, next) =>{
    const id = req.params.id;
    let result = {};
    const row = await remove(id);
    if(row.rowCount > 0){
        result.status = 200;
        result.description = 'Employee has been deleted successfully';
    }else{
        result.status = 404;
        result.description = 'Unable to delete employee';
    }
    res.json(result);
}

exports.getOneEmployee = async (req, res, next) =>{
    let result = {};
    const id = req.params.id;
    row = await readOne(id);

    if(row.length > 0){
        result.status = 200;
        result.description = `Employee info with id = ${id}`;
        result.data = row;
    }else{
        result.status = 404;
        result.description = 'Employee does not exist';
    }
    res.json(result)
}

exports.updateEmployee = async (req, res, next) =>{
    const id = req.params.id
    let result = {};
    const values = [
        req.body.email,
        req.body.department
    ]
    const row = await update(id, values);
        if(row.rowCount > 0){
            result.status = 200;
            result.description = 'Updated Successfully';
        }else{
            result.status = 404;
            result.description = 'Update Failed';
        }
        res.json(result);
}


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
        bcrypt.compare(req.body.password, employee.password).then((valid) =>{
            if(!valid){
                res.json({
                    status : 401,
                    description :'Unauthorized'
                })
            }
            const token = jwt.sign({userId : employee.id}, 'RANDOM_TOKEN_SECRET', {expiresIn:'24h'});

            res.json({
                status : 200,
                userId: employee.id,
                token
            })

        }).catch(()=>{
            res.json({
                status : 400,
                description: 'Missing Parameter'
            })
        })
    })
    .catch(() =>{
        res.json({
            status : 500,
            description: 'Unable process request'
        })
    })
}
const {Client} = require('pg');
const connectionString = 'postgressql://postgres:password@localhost:5432/postgres';

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

async function add(values){
    const text = "INSERT INTO employee(name, department) VALUES($1, $2)";
    const result = await client.query(text, values);
    return result;
}

async function remove(id){
    const result = await client.query(`DELETE FROM employee WHERE id = ${id}`);
    return result;
}

async function readOne(id){
    const results = await client.query(`SELECT * FROM employee WHERE id = ${id}`);
    return results.rows;
}


async function update(id, values){
    const text = `UPDATE employee SET name = $1, department = $2 WHERE id = ${id}`;
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
    let result = {};
    const values = [
        req.body.name,
        req.body.department
    ];
    const row = await add(values);
        if(row.rowCount > 0){
            result.status = 200;
            result.description = 'New employee successfully added';
        }else{
            result.status = 404;
            result.description = 'Unable to add new employee';
            results.error = row.error;
        } 
        res.json(result);

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
        req.body.name,
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
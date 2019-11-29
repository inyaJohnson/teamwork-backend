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
var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name : "dthvxxjui",
    api_key: "751684552895281",
    api_secret :"xarSfjcHaD8mSsSrmWBnLW5SC7E"
})

// exports.addGif = (req, res, next) =>{
//     const file = req.files.photo;
//     cloudinary.uploader.upload(file.tempFilePath, function(err, result){
//         res.json({
//             success: true,
//             url: result.url
//         })
//     })
// }

exports.getAllGif = (req, res, next) =>{
    const text = `SELECT * FROM gifs`;
    client.query(text).then((result)=>{
        const gifs = result.rows;
        res.json({
            status:'Success',
            data:{
                gifs
            }  
        })
    }).catch(()=>{
        res.json({
            status: 'Error',
            message : 'Unable to get Gifs'
        })
    })
}

exports.addGif = (req, res, next) =>{
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, function(err, result){
        const imageUrl = result.url;
        const text = `INSERT INTO gifs (title, imageUrl, createdOn, userId) VALUES($1, '${imageUrl}', (SELECT date_trunc('second', now()::timestamp)), 
        (SELECT id FROM users WHERE id = ${req.specialData .userId}))`;
        const values = [
            req.body.title,
        ];
        client.query(text, values).then(()=>{
            res.json({
                status:'Success',
                data:{
                    message : 'Gif successfully posted',
                    createdOn: functions.time(),
                    title: req.body.title,
                    imageUrl
                }
            })
        }).catch(()=>{
            res.json({
                status:'Error',
                message: 'Unable to post gif'
            })
        })
    })
}

exports.updateGif = (req, res, next) => {
    const text = `UPDATE gifs SET title =$1,
    userId = (SELECT id FROM users WHERE id = ${req.specialData.userId}) WHERE id = ${req.params.gifId}`;
    const values = [
        req.body.title
    ];

    client.query(text, values).then(()=>{
        res.json({
            status:'Success',
            message : 'Gif successfully updated',
            title: req.body.title,
        })
    }).catch(()=>{
        res.json({
            status:404,
            description: "Unable to update gif"
        })
    })
}

exports.deleteGif = (req, res, next) => {
    const text = `DELETE from gifs where id = $1`; 
    const values = [
        req.params.gifId
    ];
    client.query(text, values).then(()=>{
        res.json({
            status:'Success',
            message : 'Gif successfully deleted'
        })
    }).catch(()=>{
        res.json({
            status:'Error',
            message: "Unable to delete Gif"
        })
    })
}


exports.getOneGif = (req, res, next) =>{
    const text = `SELECT * FROM gifs WHERE id = ${req.params.gifId}`;
    client.query(text).then((result)=>{
        const gif = result.rows;
        if(gif.length > 0){
            res.json({
                status:'Successs',
                data:{
                    gif
                }
            })
        }else{
            exit;
        }
    }).catch(()=>{
        res.json({
            status: 'Error',
            message : 'Gif does not exist'
        })
    })
}


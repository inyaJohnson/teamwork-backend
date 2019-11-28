var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name : "dthvxxjui",
    api_key: "751684552895281",
    api_secret :"xarSfjcHaD8mSsSrmWBnLW5SC7E"
})

exports.addGif = (req, res, next) =>{
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, function(err, result){
        res.json({
            success: true,
            result
        })
    })
}
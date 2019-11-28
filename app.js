const express = require('express');
const app = express();
const bodyPaser = require('body-parser');
const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
const articleRoute = require('./routes/article');
const fileUpload = require('express-fileupload');
const gifRoute = require('./routes/gif');

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization ');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
// });

app.use(bodyPaser.json());

app.use('/v1/', userRoute);
app.use('/api/admin', adminRoute);
app.use('/v1/articles', articleRoute);
//ORDER FOR GIF ROUTE MATTERS
app.use(fileUpload({
    useTempFiles : true
}));
app.use('/api/gif', gifRoute);

module.exports = app;
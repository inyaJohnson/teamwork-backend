const express = require('express');
const app = express();
const bodyPaser = require('body-parser');
const employeeRoute = require('./routes/employee');
const userRoute = require('./routes/admin');
const articleRoute = require('./routes/article');

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization ');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
// });

app.use(bodyPaser.json());

app.use('/api/employee', employeeRoute);
app.use('/api/admin', userRoute);
app.use('/api/article', articleRoute);

module.exports = app;
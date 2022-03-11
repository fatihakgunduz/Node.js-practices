const express = require('express');

const app = express();

app.use('/users',(req,res,next)=>{
    console.log("Users Middleware");
});

app.use('/',(req,res,next)=>{
    console.log("Home Middleware");
    res.send('<h1>Home Page</h1>');
});

app.listen(3000);


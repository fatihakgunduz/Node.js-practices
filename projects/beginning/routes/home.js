const express = require('express');

const router = express.Router();

router.use('/',(req,res,next)=>{
    console.log("Home");
    res.render('home',{pageTitle:'Home',path:'/'});
});

module.exports = router;
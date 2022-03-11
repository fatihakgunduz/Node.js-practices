const express = require('express');

const router = express.Router();

var usernames = [];

router.use('/users',(req,res,next)=>{
    console.log("Users");
    console.log(usernames);
    res.render('users',{ users: usernames, pageTitle:'Users', path:'/users'});
});

router.post('/add-user', (req, res, next) => {
    usernames.push(req.body);
    console.log('Add User');
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;
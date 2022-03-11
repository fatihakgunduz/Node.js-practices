const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const User = require('./models/user');
const mongoose = require('mongoose');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.set('view engine','ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use( (req, res, next) => {
    User.findById('---userId---')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err=>console.log(err));
});

app.use(adminRoutes);
app.use(shopRoutes);

app.use(errorController.error404);

mongoose.connect(
    '------connection string------'
)
.then(result => {
    User.findOne().then(user => {
        if(!user){
            const user = new User({
                name: 'Fatih',
                email: 'fth@mono.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    });
   
    app.listen(3000, '0.0.0.0', function() {
        console.log('Listening to port:  ' + 3000); 
    });
})
.catch(err => console.log(err));

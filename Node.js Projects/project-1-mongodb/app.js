const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.set('view engine','ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use( (req, res, next) => {
    User.findById('606772c6ae5ef92408b04bfc')
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch(err=>console.log(err));
});

app.use(adminRoutes);
app.use(shopRoutes);

app.use(errorController.error404);

mongoConnect( () =>{    
    app.listen(3000, '0.0.0.0', function() {
        console.log('Listening to port:  ' + 3000);
    });
});
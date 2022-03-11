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
    User.findById('6068614b7742460a1056a007')
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
    'mongodb+srv://Hamenos:Tr5902vLAq5JJnzx@cluster0.4uzwx.mongodb.net/node-js?retryWrites=true&w=majority'
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

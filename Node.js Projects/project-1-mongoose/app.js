const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const User = require('./models/user');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const app = express();

const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const csrfProtection = csrf();

app.set('view engine','ejs');
app.set('views','views');

const store = new MongoDBStore({
    uri: 'mongodb+srv://Hamenos:Tr5902vLAq5JJnzx@cluster0.4uzwx.mongodb.net/node-js?retryWrites=true&w=majority',
    collection: 'sessions'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

app.use(csrfProtection);
app.use(flash());

app.use( (req, res, next) => {
    if (!req.session.user) {
        return next();
      }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use(adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.error404);

mongoose.connect(
    'mongodb+srv://Hamenos:Tr5902vLAq5JJnzx@cluster0.4uzwx.mongodb.net/node-js?retryWrites=true&w=majority'
)
.then(result => {
    app.listen(3000, '0.0.0.0', function() {
        console.log('Listening to port:  ' + 3000); 
    });
})
.catch(err => console.log(err));


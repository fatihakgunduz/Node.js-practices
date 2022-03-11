const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const app = express();

app.set('view engine','ejs');
app.set('views','views');

const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(adminRoutes);
app.use(shopRoutes);

app.use(errorController.error404);

app.listen(3000, '0.0.0.0', function() {
    console.log('Listening to port:  ' + 3000);
});
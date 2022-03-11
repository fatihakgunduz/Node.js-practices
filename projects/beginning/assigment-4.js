const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const routerUser = require("./routes/users");
const routerHome = require("./routes/home");

app.use(routerUser);
app.use(routerHome);

app.listen(3000);


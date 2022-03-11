const express = require('express');
const path = require('path');

const app = express();

const routerUser = require("./routes/users");
const routerHome = require("./routes/home");

app.use(routerUser);
app.use(routerHome);

app.listen(3000);


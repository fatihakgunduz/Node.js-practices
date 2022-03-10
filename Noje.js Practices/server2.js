var connect = require('connect');
var http = require('http');

var app = connect();

function dofirst(request,response,next){
    console.log("do first");
    
}

function dosecond(request,response,next){
    console.log(("do second"));
    next();
}

function profile(request,response){
    console.log("profile");
    
}

function home(request,response){
    console.log("home");
    
}

app.use(dofirst);
app.use(dosecond);

app.use('/profile',profile);
app.use('/home',home);

http.createServer(app).listen(5000);
console.log("Server is running");
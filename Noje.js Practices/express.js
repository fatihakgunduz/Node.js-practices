var express = require('express');
var fs = require('fs');

var app = express();

app.get('/show',function(request,response){
    response.write('Shows Users\n');
    fs.readFile('users.json',function(err,data){
        console.log(JSON.parse(data));
        response.end(data);
    });
});

app.get('/delete',function(request,response){
    response.write('Delete Users\n')
    fs.readFile('users.json',function(err,data){
        data = JSON.parse(data);
        var id = "k" + request.query.id;
        delete data[id];
        console.log(data);
        fs.writeFile('users.json',JSON.stringify(data),function(err){
            console.log('error');
        });
        response.end(JSON.stringify(data));
    });
});

app.get('/add',function(request,response){
    response.write('Add Users\n');
    var user = {
        "k3" : {
            "isim" : request.query.isim,
            "sifre" : request.query.sifre,
            "email" : request.query.email
        }
    };
    fs.readFile('users.json',function(err,data){
        data = JSON.parse(data);
        data["k3"] = user["k3"];
        console.log(data);
        fs.writeFile('users.json',JSON.stringify(data),function(err){
            console.log('error');
        });
        response.end(JSON.stringify(data));
    });
    
});

app.get('/',function(request,response){
    response.end('Home Page')
});

var server = app.listen(5000, function(){
    console.log('server is running');
});


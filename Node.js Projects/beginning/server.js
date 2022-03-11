const http = require('http');
const fs = require('fs');

function routes(request,response){
    if(request.url==="/"){
        console.log("You reached to home page");
        response.write(`<html>
            <head>
                <title>Welcome to Home Page</title>
            <head>
            <body>
                <form action="/create-user" method="POST">
                    <input type="text" name="username">
                    <button type="submit">Send</button>
                </form>
            </body>
        </html>`);
        response.end();
    }
    if(request.url==="/users"){
        console.log("You reached to users page");

        fs.readFile('users.txt',(err,data) => {
            console.log("readed");
            response.statusCode = 200;
            response.write(`<html>
                <head>
                    <title>Welcome to Users Page</title>
                <head>
                <body>
                    <ul><li>${data}</li></ul>
                </body>
            </html>`);
            
            return response.end();
        });

        
    }

    if(request.url==="/create-user"&&request.method==="POST"){
        const body = [];
        request.on('data',chunk => {
            body.push(chunk);
        });
        return request.on('end',() =>{
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            fs.appendFile('users.txt', username+"\n", err => {
                response.statusCode = 302;
                response.setHeader('Location', '/');
                return response.end();
            });
        });
    }
}

const server = http.createServer(routes).listen(3000);
console.log("server is running");
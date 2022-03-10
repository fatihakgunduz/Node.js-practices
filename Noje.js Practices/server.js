var http = require('http');

function onRequest(request,response){
    console.log("a user make a request "+request.url);
    response.writeHead(200, {"Context-Type" : "text/plain"});
    response.write("welcome to my server. Here is some data for you Yusuf");
    response.end();

}

http.createServer(onRequest).listen(5000);
console.log("Server is running");
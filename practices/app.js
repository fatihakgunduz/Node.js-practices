require('./film1');
require('./film2');

//core modules that are already builded
var fs = require('fs');
fs.writeFileSync("test.txt","This is a test code");
console.log(fs.readFileSync("test.txt").toString());

var path = require('path');
var webHome = "Desktop/User//index.html";
var webAbout =  "Desktop/User/home.html";
console.log(path.normalize(webHome));
console.log(path.dirname(webAbout));
console.log(path.basename(webAbout));
console.log(path.extname(webAbout));

setInterval(function(){
    console.log("setInterval");
},5000);

console.log(__dirname);
console.log(__filename);
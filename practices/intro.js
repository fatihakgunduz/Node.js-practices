// node js is awesome for real time stuff and it is fast 
function doSomething(){
    console.log("do something");
    console.log(this === global);
}

//export
module.exports.f = doSomething;
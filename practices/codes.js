
var variableFunc = function(){
    console.log("This is a variable function");
};

variableFunc();

setTimeout(variableFunc,5000);


function order(orderNumber){

    console.log("Customer order",orderNumber);

    cookAndDeliver(function (){
        console.log("Delivered food order", orderNumber);
    });
}

function cookAndDeliver(callback){
    setTimeout(callback,5000);
}

order(1);
order(2);
order(3);
order(4);
order(5);
order(6);
order(7);

var Bucky = {
    favfood : "B",
    favMov : "C",
    printFirstName : function (){
        console.log("My name is bucky");
        console.log(this === Bucky);
        //this keyword is a reference to whatever calling it
    }
};

function doSomething(){
    console.log("do something");
    console.log(this === global);
}

var Person = Bucky; //it is a reference not a copy
Person.favfood = "A";
console.log(Person.favfood);

Bucky.printFirstName();

doSomething();

function User(name){
    this.name= name;
    this.life=100;

    this.givelife = function givelife(player){
        player.life += 10;
    }
}

var Fatih = new User("Fatih");
var Yusuf = new User("Yusuf");

console.log(Fatih.name);
console.log(Yusuf.name);
Fatih.givelife(Yusuf);
console.log(Fatih.life);
console.log(Yusuf.life);

User.prototype.damage = function damage(player){
    player.life -= 15;
};

User.prototype.magic = 50;

Yusuf.damage(Fatih);

console.log(Fatih.magic);
console.log(Yusuf.magic);

console.log(Fatih.life);
console.log(Yusuf.life);


//import
var m = require("./intro");
m.f();

//when you export a module it shared with others some changes on it affects all

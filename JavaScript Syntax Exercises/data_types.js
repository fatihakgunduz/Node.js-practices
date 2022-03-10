/* Data types:
undefined, null, boolean, string, symbol, number, and object
*/

// variable able to use whole program
var myName = "Beau" //

myName = 8 // you can set it as number or something else

// variable able to use only within the scope where you declare
let name = "javascript course"

// variable that never change
const pi = 3.14

var a;

console.log(a) //like printf

a = 7;

var b = 2;


//object

var ourDog = {
    "name": "Camper",
    "legs": 4,
    "tails": 1,
    "friends": ["everything!"]
};


var pet = [
    {
        "name": "Camper",
        "legs": 4,
        "tails": 1,
        "friends": ["everything!"]
    },

    {
        "name": "acdsvm",
        "legs": 4,
        "tails": 1,
        "friends": ["everything!"]
    }
];


var myStorage = {
    "car": {
        "inside": {
            "glove box": "maps",
            "passenger seat": "crumbs"
        },
        "outside": {
            "trunk": "jack"
        }
    }
};

var contents = myStorage.car.inside["glove box"];
console.log(contents);

var dogname = ourDog.name;//if the name has a space (like "dog name") on it we should use  ourdog["dog name"]
var dogleg = ourDog["legs"];

ourDog.name="Coder";

//new property for object
ourDog.bark = "bow-wow"
ourDog['age'] = 2;

//deleting
delete ourDog.bark

// check if it has a property 
ourDog.hasOwnProperty("leg") //returns true or false

// booleans "true" "false"

console.log(a) 

// JavaScript is case-sensitive

var x = 0.5*2;
var y = 0.6*3;
var z = 5/2;
var w = 6%4;

console.log(x);
console.log(y);
console.log(z);
console.log(w);

var k = "it is \"string\"";
var l = 'it is "string"';
var m =`'usvkrjbve""jkwbv'`

m += l;

lengthOfM = m.length;

console.log(k);
console.log(l);
console.log(m);
console.log(lengthOfM);

var myarray = [15,"elements can be any data type",85];

var multiarray =[[15,"sdv"],[43,"vsd"]];

var multiarray1 =[[15,"sdv"],[43,"vsd"],23,[[18,25],74,"vs"]];

console.log(multiarray1[3][0]);
console.log(multiarray1[3][0][0]);
console.log(multiarray1[2]);

//arrays has push and pop

//shift removes first element from the array

// unshift(["element"] adds the element to the beginning of the array)

//global variables can be accessed inside the functions

//if we don't use var while defining the variable it becomes global

var myGlobal = 15;

function fun1(){

    oppsGlobal=5;
}


function fun2(){

    console.log(oppsGlobal);
    console.log(myGlobal);
    
    myGlobal = 25;
    console.log(myGlobal);
}

fun1();
fun2();
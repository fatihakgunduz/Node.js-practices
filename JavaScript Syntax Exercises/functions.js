
var random = Math.random()*10;

var random1 = Math.floor(Math.random()*10);

console.log(random); //decimal number
console.log(random1); //whole number

parseInt("61");//base 10
parseInt("10011",2);//base 2

//a === b ? true : false; //ternary operator

var myConcat = (arr1,arr2) => arr1.concat(arr2);//arrow functions

console.log(myConcat([1,2],[3,4,5]));

// (...args) ==> args = [x,y,z,..] 

//arr2 = [...arr2]; it copies all arr2 elements to arr1
//arr2 = arr1 // arr2 is equal arr1 now they are same


//destructuring
const AVG_TEMPERATURES = {
    today : 77.5,
    tomorrow : 79
};

const { tomorrow : tempOfTomorrow } = AVG_TEMPERATURES;
console.log(tempOfTomorrow);

const [z,x,,y] = [1,2,3,4,5,6];
console.log(z,x,y);

const person = {
    name: "Zodiac",
    age: 56
};

const greeting = `Hello, my name is ${person.name}!
I am ${person.age} years old. `;

console.log(greeting);
//
// Object Destructuring
//

const person = {
  name: "R4z1ell",
  age: 26,
  location: {
    city: "Roma",
    temp: 14
  }
};

/* This code below is EQUIVALENT to 'const name = person.name' and 'const age = person.age'. So with the code
below we're pretty much creating TWO Variables 'name' and 'age' and they gets THOSE values from the 'person'
Object above. So they look for a 'name' and 'age' property INSIDE the 'person' Object. Another FEATURE of
"Destructuring" is the ability to set DEFAULT values. So all we have to do is add the EQUAL '=' symbol after the
variable name and there add the VALUE that we want to use as default. Now that we've added this DEFAULT values
if for example our 'person' Object DOESN'T have a 'name' property defined we'll now use THIS newly created
DEFAULT value INSTEAD. Now if we want we can have BOTH a DEFAULT value AND a RENAMED value in place at the SAME
time(it gets a bit messy but its perfectly possible). So now we've created a LOCAL 'firstName' const that it's
going to get the value from 'person.name' and if the THAT 'person.name' property DOESN'T exist it will use the
"Anonymous" value INSTEAD */
const { name: firstName = "Anonymous", age } = person;

// Then here below we can use those VARIABLES we've just created with ES6 "DESTRUCTURING"
console.log(`${firstName} is ${age}.`);

/* Here below we're using "Destructuring" for a NESTER Object(the Object inside person.location) and that is
PERFECTLY fine to create those NEW 'city' and 'temp' variables. With "Destructuring" we've also  access to other
FEATURES, for example we can RENAME the 'variable' we create, all we have to do is use the "RENAMING SYNTAX" that
consist on adding a COLON(so the ':') AFTER the variable we're trying to DESTRUCTURE and then add the NEW name
that we want to use(so the 'temperature' for example). So this will have the effect of GRABBING the 'temp'
property from the 'person.location' NESTED Object above and ADDING it to this NEW 'temperature' variable. Now
though if we TRY to access the 'temp' variable below inside the 'if' statemente INSTEAD of using the 'temperature'
variable we would get an ERROR inside the console, because now we NO LONGER have access to the 'temp' variable
because we've RENAMED it to 'temperature', so the 'temp' variable NEVER gets created even though it's STILL
grabbing the value from 'person.location.temp' */
// const { city, temp: temperature } = person.location;

// if (city && temperature) {
//   console.log(`It's ${temperature} in ${city}.`);
// }

// CHALLENGE
const book = {
  title: "Ego is the Enemy",
  author: "Ryan Holiday",
  publisher: {
    name: "Penguin"
  }
};

const { name: publisherName = "Self-Published" } = book.publisher;

console.log(publisherName);

//
// Array Destructuring
//

const address = [
  "1299 S Juniper Street",
  "Philadelphia",
  "Pennsylvania",
  "19147"
];

/* Just like "Object Destructuring" allowed us to pull properties OFF of an Object, "Array Destructuring" allows
us to pull ITEMS off an Array. For "Object Destructuring" we used the Curly braces '{}' to DEFINE the destructuring
INSTEAD for "Array Destructuring" we're going to use the BRACKETS '[]'. INSIDE those brackets we'll put an ORDERED
list of Variables NAMES('street', 'city' and so on), UNLIKE Object the variables names we're using DOESN'T exist
inside our 'address' ARRAY, so we're NOT matching them up BY name BUT by POSITION, so 'street' for example is the
FIRST thing we're going to DESTRUCTURE and it will get the FIRST item in the 'address' Array and so on and so
forth for ALL the other variables. The fact that the 'address' Array has FOUR items DOESN'T mean that we need to
destructure ALL four items, we can actually just have an empty name and it will actually SKIP that item. Let's
say that we ONLY want to create a 'city' and 'state' variables and we DON'T want to create a variable for 'zip'
and 'street' because we're not going to take advantage of those, ALL we need to do is just REMOVE that 'zip' 
variable name from inside the brackets and for 'street' we ALSO remove its name BUT we LEAVE the COMMA. With
"Array Destructuring" we DON'T have the RENAMING feature of "Object Destructuring", if we want to RENAME the
variable we just CHANGE its name inside the DESTRUCTURING Brackets(so for example we can change 'state' in
'yourState'). BUT we HAVE access to the DEFAULT value feature, just like for Object destructuring we ADD the 
EQUAL symbol after the variable name and we ADD the NEW name that we want to use as DEFAULT and we're DONE, so
if the THIRD item inside the 'address' Array is NOT provided we will now use this NEW value of 'New York' instead 
*/
const [, city, state = "New York"] = address;

console.log(`You are in ${city} ${state}`);

// CHALLENGE

const item = ["Coffee (hot)", "$2.00", "$2.50", "$2.75"];

const [itemName, , mediumPrice] = item;
console.log(`A medium ${itemName} costs ${mediumPrice}`);

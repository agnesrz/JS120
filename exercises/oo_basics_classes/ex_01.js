// function logConstructor(value) {
//   if (Array.isArray(value)) {
//     console.log('Array');
//   } else {
//     let valueType = typeof value;
//     console.log(valueType.slice(0, 1).toUpperCase() + valueType.slice(1));
//   }
// }

// logConstructor("Hello"); // String
// logConstructor([1,2,3]); // Array
// logConstructor({name: 'Srdjan'}); // Object

console.log("Hello".constructor.name); // String
console.log([1,2,3].constructor.name); // Array
console.log({name: 'Srdjan'}.constructor.name); // Object


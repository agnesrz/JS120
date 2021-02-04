// Solution

function objectsEqual(obj1, obj2) {
  let obj1Contents = Object.entries(obj1);
  let obj2Contents = Object.entries(obj2);
  
  if (obj1Contents.length !== obj2Contents.length) {
    return false;
  }
  
  for (let idx = 0; idx < obj1Contents.length; idx += 1) {
    for (let innerIdx = 0; innerIdx < 2; innerIdx += 1) {
      if (obj1Contents[idx][innerIdx] !== obj2Contents[idx][innerIdx]) {
        return false;
      }
    }
  }

return true;
  
}

// //// Alternate Solution

// function objectsEqual(obj1, obj2) {
//   let obj1String = String(Object.entries(obj1));
//   let obj2String = String(Object.entries(obj2));

//   return obj1String === obj2String;
// }



console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
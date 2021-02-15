// name property added to make objects easier to identify
let foo = {
  name: 'foo',
  ancestors() {
    let ancestors = [];
    let prototypeObj = Object.getPrototypeOf(this);
    
    while(prototypeObj) {
      ancestors.push(prototypeObj.name || String(prototypeObj));
      prototypeObj = Object.getPrototypeOf(prototypeObj);
    }
    
    console.log(ancestors);
  }
};
let bar = Object.create(foo);
bar.name = 'bar';
let baz = Object.create(bar);
baz.name = 'baz';
let qux = Object.create(baz);
qux.name = 'qux';

qux.ancestors();  // returns ['baz', 'bar', 'foo', 'Object.prototype']
baz.ancestors();  // returns ['bar', 'foo', 'Object.prototype']
bar.ancestors();  // returns ['foo', 'Object.prototype']
foo.ancestors();  // returns ['Object.prototype']


/*
Algorithm:

-create a variable (currentObject) to store the current object
-While currentObject's constructor is not null:
  -Push the constructor's name to the ancestors array
  -save the constructor to currentObject
-return the acenstors array
*/
let cats = {
  names: [ 'Butterscotch', 'Pudding', 'Fluffy' ],
  foo() {
    [1, 2, 3].forEach(function(number) {
      console.log(`${number}: ${this.names[number - 1]}`);
    });
  },
};

cats.foo();
// Expected output:
// 1: Butterscotch
// 2: Pudding
// 3: Fluffy
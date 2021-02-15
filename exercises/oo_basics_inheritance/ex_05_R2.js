const WalkMixin = {
  walk() {
    return "Let's go for a walk!";
  }
};

class Cat {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello! My name is ${this.name}!`;
  }
}

Object.assign(Cat.prototype, WalkMixin);

let kitty = new Cat("Sophie");
console.log(kitty.greet()); // Hello! My name is Sophie!
console.log(kitty.walk()); // Let's go for a walk!
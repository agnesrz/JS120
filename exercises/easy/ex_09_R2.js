const walkMixin = {
  walk() {
    return `${this.name} ${this.gait()} forward`;
  }
}

class Person {
  constructor(name) {
    this.name = name;
    Object.assign(this, walkMixin);
  }

  gait() {
    return "strolls";
  }
}

class Cat {
  constructor(name) {
    this.name = name;
    Object.assign(this, walkMixin);
  }

  gait() {
    return "saunters";
  }
}

class Cheetah {
  constructor(name) {
    this.name = name;
    Object.assign(this, walkMixin);
  }

  gait() {
    return "runs";
  }
}

let mike = new Person("Mike");
console.log(mike.walk());
// "Mike strolls forward"

let kitty = new Cat("Kitty");
console.log(kitty.walk());
// "Kitty saunters forward"

let flash = new Cheetah("Flash");
console.log(flash.walk());
// "Flash runs forward"
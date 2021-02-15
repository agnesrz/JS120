class Cat {
  constructor(name) {
    this.name = name;
    this.greet();
  }
  
  greet() {
    console.log(`Hello! My name is ${this.name}!`);
  }
}

let kitty = new Cat('Sophie'); // Hello! My name is Sophie!
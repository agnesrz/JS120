const towMixin = {
  tow() {
    return "'I can tow a trailer!'";
  }
}

class Vehicle {
  constructor(year) {
    this.year = year;
  }
}

class Truck extends Vehicle {
  constructor(year) {
    super(year);
    Object.assign(this, towMixin);
  }
}

class Car extends Vehicle {}

let truck = new Truck(2002);
console.log(truck.year); // 2002
console.log(truck.tow()); // I can tow a trailer!

let car = new Car(2015);
console.log(car.year); // 2015





const towMixin = {
  tow() {
    console.log('I can tow a trailer!');
  }  
}

class Truck {}
Object.assign(Truck.prototype, towMixin);

class Car {}

let truck = new Truck();
truck.tow(); // I can tow a trailer!
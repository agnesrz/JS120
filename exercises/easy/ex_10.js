class Pet {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }
  
  info() {
    return `a ${this.type} named ${this.name}`;
  }
}

class Owner {
  constructor(name) {
    this.name = name;
    this.pets = [];
  }
  
  numberOfPets() {
    return this.pets.length;
  }
}

class Shelter {
  constructor() {
    this.adoptablePets = [];
    this.peopleWhoAdopted = [];
  }
  
  addAdoptablePets(pets) {
    this.adoptablePets.push(...pets);
  }
  
  adopt(owner, pet) {
    owner.pets.push(pet);
    
    if (this.peopleWhoAdopted.includes(owner)) return;
    
    this.peopleWhoAdopted.push(owner);
  }
  
  printAdoptions() {
    this.peopleWhoAdopted.forEach(owner => {
      console.log(`${owner.name} has adopted the following pets:`);
      
      owner.pets.forEach(pet => {
        console.log(pet.info());
      });
      
      console.log('');
    });
  }
  
  printAdoptablePets() {
    console.log('The Animal Shelter has the following unadopted pets:');
    this.adoptablePets.forEach(pet => {
      console.log(pet.info());
    });
  }
}

let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);


// P Hanson has 3 adopted pets.
// B Holmes has 4 adopted pets.
// The Animal shelter has 7 unadopted pets.

// P Hanson has adopted the following pets:
// a cat named Butterscotch
// a cat named Pudding
// a bearded dragon named Darwin

// B Holmes has adopted the following pets:
// a dog named Molly
// a parakeet named Sweetie Pie
// a dog named Kennedy
// a fish named Chester

// P Hanson has 3 adopted pets.
// B Holmes has 4 adopted pets.

let astra = new Pet('dog', 'Astra');
let laddie = new Pet('dog', 'Laddie');
let fluffy = new Pet('cat', 'Fluffly');
let kat = new Pet('cat', 'Kat');
let ben = new Pet('cat', 'Ben');
let chatterbox = new Pet('parakeet', 'Chatterbox');
let bluebell = new Pet('parakeet', 'Bluebell');

shelter.addAdoptablePets([astra, laddie, fluffy, kat, ben, chatterbox, bluebell]);
console.log('');
shelter.printAdoptablePets();


// The Animal Shelter has the following unadopted pets:
// a dog named Asta
// a dog named Laddie
// a cat named Fluffy
// a cat named Kat
// a cat named Ben
// a parakeet named Chatterbox
// a parakeet named Bluebell
//   ...
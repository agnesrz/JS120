function UserCreater() {
  this.balance = 0;
}

let big = new UserCreater();
console.log(UserCreater.constructor);// Function ?
console.log(UserCreater.prototype.constructor)// UserCreater
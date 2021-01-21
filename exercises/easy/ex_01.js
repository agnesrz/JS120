class Rectangle {
  constructor(length, width) {
    this.length_ = length;
    this.width = width;
  }
  
  getLength() {
    return this.length_;
  }
  
  getWidth() {
    return this.width;
  }
  
  getArea() {
    return this.width * this.length_;
  }
}

let rect = new Rectangle(4, 5);

console.log(rect.getWidth()); // 4
console.log(rect.getLength()); // 5
console.log(rect.getArea()); // 20
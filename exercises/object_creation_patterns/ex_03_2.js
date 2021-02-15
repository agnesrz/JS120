class CircularQueue {
  constructor(bufferSize) {
    this.buffer = new Array(bufferSize).fill(null);
  }
  
  enqueue(value) {
    function firstSlotTaken() {
      return this.buffer[0] !== null;
    }
    
    function someSlotsEmpty() {
      return this.buffer.some(value => value === null);
    }
    
    while(firstSlotTaken.call(this) && someSlotsEmpty.call(this)) {
      this.buffer.push(this.buffer.shift());
    }
    
    this.buffer.shift();
    this.buffer.push(value);
  }
  
  dequeue() {
    function firstSlotEmpty() {
      return this.buffer[0] === null;
    }
    
    function someSlotsOccupied() {
      return this.buffer.some(value => value !== null);
    }
    
    while(firstSlotEmpty.call(this) && someSlotsOccupied.call(this)) {
      this.buffer.push(this.buffer.shift());
    }
    
    this.buffer.push(null);
    return this.buffer.shift();
  }
}

let queue = new CircularQueue(3);
console.log(queue.buffer);
console.log(queue.dequeue() === null);

queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue() === 1);

queue.enqueue(3);
queue.enqueue(4);
console.log(queue.dequeue() === 2);

queue.enqueue(5);
queue.enqueue(6);
queue.enqueue(7);
console.log(queue.dequeue() === 5);
console.log(queue.dequeue() === 6);
console.log(queue.dequeue() === 7);
console.log(queue.dequeue() === null);

let anotherQueue = new CircularQueue(4);
console.log(anotherQueue.dequeue() === null);

anotherQueue.enqueue(1);
anotherQueue.enqueue(2);
console.log(anotherQueue.dequeue() === 1);

anotherQueue.enqueue(3);
anotherQueue.enqueue(4);
console.log(anotherQueue.dequeue() === 2);

anotherQueue.enqueue(5);
anotherQueue.enqueue(6);
anotherQueue.enqueue(7);
console.log(anotherQueue.dequeue() === 4);
console.log(anotherQueue.dequeue() === 5);
console.log(anotherQueue.dequeue() === 6);
console.log(anotherQueue.dequeue() === 7);
console.log(anotherQueue.dequeue() === null);
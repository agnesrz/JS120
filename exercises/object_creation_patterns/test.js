class CircularQueue {
  constructor(size) {
    this.buffer = new Array(size).fill(null); // [4, null, 3];
    this.nextPosition = 0; // 1
    this.oldestPosition = 0; // 3
  }

  enqueue(object) {// 4
    if (this.buffer[this.nextPosition] !== null) {
      this.oldestPosition = this.increment(this.nextPosition);
    }
    this.buffer[this.nextPosition] = object;
    this.nextPosition = this.increment(this.nextPosition);
  }

  dequeue() {
    let value = this.buffer[this.oldestPosition];//2
    this.buffer[this.oldestPosition] = null;
    if (value !== null) {
      this.oldestPosition = this.increment(this.oldestPosition);
    }
    return value;
  }

  increment(position) { // next position = 1
    return (position + 1) % this.buffer.length; // 2 % 3 = 1
  }
}

let queue = new CircularQueue(3);
console.log(queue.dequeue() === null);

queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue() === 1);

queue.enqueue(3);
queue.enqueue(4);
console.log(queue.dequeue() === 2);
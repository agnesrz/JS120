class CircularQueue {
  constructor(bufferSize) {
    this.buffer = this.createBuffer(bufferSize);
    this.queueOrder = this.createQueueOrder(bufferSize);
    // createQueueOrder returns an array of numbers. Each number represents a key in the buffer. The number in the
    // first position in the array represents the key of the value that has been in the buffer the longest.
  }

  createBuffer(bufferSize) {
    let buffer = {};

    for (let slot = 1; slot <= bufferSize; slot += 1) {
      buffer[slot] = null;
    }

    return buffer;
  }

  createQueueOrder(bufferSize) {
    let queueOrder = [];
    for (let slotNum = 1; slotNum <= bufferSize; slotNum += 1) {
      queueOrder.push(slotNum);
    }
    return queueOrder;
  }

  adjustQueueOrder(process) {
    let oldestSlot = process === 'enqueue' ? this.getOldestEmptySlot() :
      this.getOldestOccupiedSlot();
    
    while (this.queueOrder[0] !== oldestSlot) {
      this.queueOrder.push(this.queueOrder.shift());
    }
  }
  
  rotateQueueOrder() {
    this.queueOrder.push(this.queueOrder.shift());
  }

  emptySlots() {
    return Object.values(this.buffer).some(value => value === null);
  }

  getEmptySlots() {
    return Object.entries(this.buffer).filter(slot => slot[1] === null)
                 .map(slot => Number(slot[0]));
  }

  getOldestSlotValue() {
    return this.buffer[this.queueOrder[0]];
  }
  
  getOldestEmptySlot() {
    let emptySlots = this.getEmptySlots();
    // console.log('got here');//test
    // console.log(emptySlots);//test

    for (let idx = 0; idx < this.queueOrder.length; idx += 1) {
      let currentSlot = this.queueOrder[idx];

      if (emptySlots.includes(currentSlot)) {
        return currentSlot;
      }
    }
  }

  getOldestOccupiedSlot() {
    let occupiedSlots = this.getOccupiedSlots();

    for (let idx = 0; idx < this.queueOrder.length; idx += 1) {
      let currentSlot = this.queueOrder[idx];

      if (occupiedSlots.includes(currentSlot)) {
        return currentSlot;
      }
    }
  }

  getOccupiedSlots() {
    return Object.entries(this.buffer).filter(slot => slot[1] !== null).map(slot => Number(slot[0]));
  }

  slotEmpty(value) {
    return value === null;
  }

  everySlotEmpty() {
    return Object.values(this.buffer).every(slot => this.slotEmpty(slot));
  }
  
  replaceOldestSlotValue(newValue) {
    this.buffer[this.queueOrder[0]] = newValue;
  }

  enqueue(newValue) {
    if (this.emptySlots() && !this.everySlotEmpty()) {
      this.adjustQueueOrder('enqueue');
    }

    this.buffer[this.queueOrder[0]] = newValue;
    this.rotateQueueOrder();
  }

  dequeue() {
    let oldestSlotValue = this.getOldestSlotValue();

    if (this.slotEmpty(oldestSlotValue)) {
      if (this.everySlotEmpty()) {
        return oldestSlotValue;
      }
      this.adjustQueueOrder('dequeue');
      oldestSlotValue = this.getOldestSlotValue();
    }

    this.replaceOldestSlotValue(null);
    this.rotateQueueOrder();

    return oldestSlotValue;
  }
}

// let queue = new CircularQueue(3);
// console.log(queue.dequeue() === null);

// queue.enqueue(1);
// queue.enqueue(2);
// console.log(queue.dequeue() === 1);

// queue.enqueue(3);
// queue.enqueue(4);
// console.log(queue.dequeue() === 2);

// queue.enqueue(5);
// queue.enqueue(6);
// queue.enqueue(7);
// console.log(queue.dequeue() === 5);
// console.log(queue.dequeue() === 6);
// console.log(queue.dequeue() === 7);
// console.log(queue.dequeue() === null);

// let anotherQueue = new CircularQueue(4);
// console.log(anotherQueue.dequeue() === null);

// anotherQueue.enqueue(1);
// anotherQueue.enqueue(2);
// console.log(anotherQueue.dequeue() === 1);

// anotherQueue.enqueue(3);
// anotherQueue.enqueue(4);
// console.log(anotherQueue.dequeue() === 2);

// anotherQueue.enqueue(5);
// anotherQueue.enqueue(6);
// anotherQueue.enqueue(7);
// console.log(anotherQueue.dequeue() === 4);
// console.log(anotherQueue.dequeue() === 5);
// console.log(anotherQueue.dequeue() === 6);
// console.log(anotherQueue.dequeue() === 7);
// console.log(anotherQueue.dequeue() === null);
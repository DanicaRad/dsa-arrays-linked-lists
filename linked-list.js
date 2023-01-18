/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    this.length += 1;
    const newNode = new Node(val);
    if(!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
    this.tail.next = newNode;
    this.tail = newNode;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    this.length += 1;
    const newNode = new Node(val);
    if(!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
    newNode.next = this.head;
    this.head = newNode;
  }

  /** pop(): return & remove last item. */

  pop() {
    if(this.length === 1) {
      const popped = this.tail.val;
      this.length = 0;
      this.head = null;
      this.tail = null;
      return popped;
    }
    let current = this.head;
    while(current !== null) {
      if(current.next === this.tail) {
        const popped = this.tail.val;
        this.tail = current;
        this.tail.next = null;
        this.length -= 1;
        return popped;
      }

    }
    throw new Error("empty list");
  }

  /** shift(): return & remove first item. */

  shift() {
    if(this.head !== null) {
      if(this.length === 1) {
        const shifted = this.head.val;
        this.head = null;
        this.tail = null;
        this.length = 0;
        return shifted;
      }
      const oldHeadVal = this.head.val;
      if(this.head.next === null) {
        this.head = null;
        this.tail = null;
        this.length -= 1;
        return oldHeadVal;
      }
      this.head = this.head.next;
      this.length -= 1;
      return oldHeadVal;
    }
    return ({error: "empty list"});
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if(this.head === null || idx > this.length - 1) return ({error: "not found"});
    let current = this.head;
    for(let i = 0; i < idx; i++) {
      current = current.next;
    }
    return current.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if(idx > this.length) throw new Error("not found");
    let current = this.head;
    for(let i = 0; i < idx; i++) {
      current = current.next;
    }
    current.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if(idx > this.length + 1) throw new Error("not found");
    if(idx === 0) {
      this.unshift(val);
      return;
    }
    if(idx === this.length) {
      this.push(val);
      return;
    }

    const newNode = new Node(val);
    this.length += 1;
    let current = this.head;
    for(let i = 0; i < idx - 1; i++) {
      current = current.next;
    }
    const next = current.next;
    current.next = newNode;
    newNode.next = next;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if(idx > this.length - 1) throw new Error("not found");
    if(idx === 0) {
      this.shift();
      return;
    }
    if(idx === this.length - 1) {
      this.pop();
      return;
    }

    this.length -= 1;
    let current = this.head;
    for(let i = 0; i < idx -1; i++) {
      current = current.next;
    };
    current.next = current.next.next;
  }

  /** average(): return an average of all values in the list */

  average() {
    let sum = 0;
    let current = this.head;
    while(current !== null) {
      sum += current.val;
      current = current.next;
    }
    return sum / this.length || 0;
  }
}

module.exports = LinkedList;

class MyArray {
  constructor(...args) {
    this.length = 0;

    for (const item of args) {
      this[this.length++] = item;
    }
  }

  push(...args) {
    for (const item of args) {
      this[this.length++] = item;
    }
    return this.length;
  }

  pop() {
    if (this.length) {
      const deleteElement = this[this.length - 1];
      delete this[this.length-- - 1];
      return deleteElement;
    }
    return;
  }

  unshift(...args) {
    args.forEach((item, numb) => {
      this.forEach((item, numb) => {
        this[this.length - numb] = this[this.length - numb - 1];
      });
      this[numb] = item;
      this.length++;
    });
    return this.length;
  }

  shift() {
    if (this.length) {
      const deleteElement = this[0];
      delete this[0];

      this.forEach((item, numb) => {
        item = this[numb + 1];
      });

      delete this[--this.length];
      return deleteElement;
    }
    return;
  }

  concat(...args) {
    const newArray = new MyArray();
    newArray.push(...this);
    for (const item of args) {
      newArray.push(...item);
    }
    return newArray;
  }

  reverse() {
    const arrayCopy = Object.assign(new MyArray(), this);
    this.forEach((item, numb) => {
      this[numb] = arrayCopy.pop();
    });
    return this;
  }

  forEach(func) {
    for (let i = 0; i < this.length; i++) {
      func(this[i], i, this);
    }
    return;
  }

  map(func) {
    const newArr = new MyArray();
    for (let i = 0; i < this.length; i++) {
      newArr.push(func(this[i], i, this));
    }
    return newArr;
  }

  flat(depth = 1) {
    if (typeof depth !== "number") {
      throw new TypeError("Depth must be a number or empty");
    }

    let newArr = new MyArray();
    this.forEach((item) => {
      if ((MyArray.isMyArray(item) || Array.isArray(item)) && depth) {
        newArr = newArr.concat(item.flat(depth - 1));
      } else if (item !== undefined) {
        newArr.push(item);
      }
    });
    return newArr;
  }

  static isMyArray(arg) {
    return arg instanceof MyArray;
  }

  [Symbol.iterator]() {
    return new MyArrayIterator(this);
  }
}

class MyArrayIterator {
  constructor(myArray) {
    this.array = myArray;
    this.currentValue = 0;
  }

  next() {
    return {
      value: this.array[this.currentValue++],
      done: this.currentValue > this.array.length,
    };
  }
}

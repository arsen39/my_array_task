function MyArray() {
  this.length = 0;

  this.isMyArray = function isMyArray(arg) {
    return arg instanceof MyArray;
  };
}

function MyArrayPrototype() {
  this.push = function push() {
    for (let i = 0; i < arguments.length; i++) {
      this[this.length++] = arguments[i];
    }
    return this.length;
  };

  this.pop = function pop() {
    if (this.length !== 0) {
      const deleteElement = this[this.length - 1];
      delete this[this.length-- - 1];
      return deleteElement;
    }
    return undefined;
  };

  this.unshift = function unshift() {
    for (let i = 0; i < this.length; i++) {
      this[arguments.length + i] = this[i];
    }
    for (let i = 0; i < arguments.length; i++) {
      this[i] = arguments[i];
    }
    this.length += arguments.length;
    return this.length;
  };

  this.shift = function shift() {
    if (this.length !== 0) {
      const deleteElement = this[0];
      delete this[0];

      for (let i = 0; i < this.length; i++) {
        this[i] = this[i + 1];
      }

      delete this[--this.length];
      return deleteElement;
    }
    return undefined;
  };

  this.concat = function concat() {
    const newArray = Object.assign(new MyArray(), this);
    for (let i = 0; i < arguments.length; i++) {
      if (arguments[i] instanceof Array || arguments[i] instanceof MyArray) {
        for (j = 0; j < arguments[i].length; j++) {
          newArray[newArray.length++] = arguments[i][j];
        }
      } else {
        newArray[newArray.length++] = arguments[i];
      }
    }

    return newArray;
  };

  this.reverse = function reverse() {
    const arrayCopy = Object.assign(new MyArray(), this);
    for (let i = 0; i < this.length; i++) {
      this[i] = arrayCopy.pop();
    }
    return this;
  };

  this.forEach = function forEach(func) {
    for (let i = 0; i < this.length; i++) {
      func(this[i], i, this);
    }
    return undefined;
  };

  this.map = function map(func) {
    const newArr = new MyArray();
    for (let i = 0; i < this.length; i++) {
      newArr.push(func(this[i], i, this));
    }
    return newArr;
  };

  this.flat = function flat(depth = 1) {
    const newArr = new MyArray();
    const those = this;
    const flatter = function flatter(depth, those) {
      if (those instanceof Array || those instanceof MyArray) {
        those.forEach((item) => {
          if (item instanceof Array || item instanceof MyArray) {
            if (depth > 1) {
              item.forEach((itemsItem) => {
                flatter(depth - 1, itemsItem);
              });
            } else {
              item.forEach((itemsItem) => {
                newArr.push(itemsItem);
              });
            }
          } else {
            newArr.push(item);
          }
        });
      } else {
        newArr.push(those);
      }
    };
    flatter(depth, those);
    return newArr;
  };
}

MyArray.prototype = new MyArrayPrototype();

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
    const newArray = JSON.parse(JSON.stringify(this));
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
    const arrayCopy = JSON.parse(JSON.stringify(this));
    for (let i = 0; i < arrayCopy.length; i++) {
      this[i] = arrayCopy[arrayCopy.length - 1 - i];
    }
    return this;
  };

  this.foreach = function foreach(func) {
    for (let i = 0; i < this.length; i++) {
      func(this[i], i, this);
    }
    return undefined;
  };

  this.map = function map(func) {
    const newArr = [];
    for (let i = 0; i < this.length; i++) {
      newArr.push(func(this[i], i, this));
    }
    return newArr;
  };

  this.flat = function flat(depth) {
    const newArr = [];
    const those = this;
    const flatter = function flatter(depth, those) {
      those.foreach((item) => {
        if (item instanceof Array || item instanceof MyArray) {
          item.foreach((item2) => {
            newArr.push(item2);
          });
        } else {
          newArr.push(item);
        }
      });
    };
    flatter(undefined,those);
    return newArr;
  };
}

MyArray.prototype = new MyArrayPrototype();

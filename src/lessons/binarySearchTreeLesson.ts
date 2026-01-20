export class BSTNode<T> {
  value: T | null;
  left: BSTNode<T> | null = null;
  right: BSTNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTreeLesson<T> {
  root: BSTNode<T> | null;

  constructor() {
    this.root = null;
  }

  insert(value: T) {
    const newNode = new BSTNode(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (true) {
      if (value === current.value) {
        return undefined;
      }
      if (current.value && value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  find(value: T) {
    if (!this.root) {
      return null;
    }
    let current: BSTNode<T> | null = this.root;
    while (current) {
      if (value === current.value) {
        return current;
      }
      if (current.value && value > current.value) {
        current = current.right;
      } else if (current.value) {
        current = current.right;
      }
    }
  }
}

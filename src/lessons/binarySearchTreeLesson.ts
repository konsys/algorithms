export class BSTNode<T> {
  value: T;
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
      if (value < current.value) {
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

  find(value: T): BSTNode<T> | null {
    if (!this.root) return null;

    let current: BSTNode<T> | null = this.root;

    while (current) {
      if (value === current.value) {
        return current; // Нашли узел
      }

      if (value < current.value) {
        current = current.left; // Идем влево, если искомое МЕНЬШЕ
      } else {
        current = current.right; // Идем вправо, если искомое БОЛЬШЕ
      }
    }

    return null; // Если прошли всё дерево и не нашли
  }
}

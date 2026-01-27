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
    if (!this.root) {
      return null;
    }

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

  bfs() {
    let node = this.root;
    let data = [];
    let queue = [];
    queue.push(node);
    while (queue.length) {
      node = queue.shift()!;
      data.push(node.value);

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    return data;
  }

  // Depth-First Search (In-order: Left, Root, Right)
  dfsInOrder() {
    let data: T[] = [];

    function traverse(node: BSTNode<T> | null) {
      if (node?.left) {
        traverse(node.left);
      }
      data.push(node!.value);

      if (node?.right) {
        traverse(node.right);
      }
    }

    traverse(this.root);
    return data;
  }

  // DFS Pre-order (Обход в прямом порядке) —
  // это способ обхода дерева, при котором мы посещаем узлы в последовательности:
  //   Корень → Лево → Право.
  dfsPreOrder() {
    let data: T[] = [];

    function traverse(node: BSTNode<T>) {
      data.push(node.value);
      if (node.left) {
        traverse(node.left);
      }
      if (node.right) {
        traverse(node.right);
      }
    }

    if (this.root) {
      traverse(this.root);
    }
    return data;
  }

  // DFS Post-order (Left, Right, Root)
  dfsPostOrder() {
    let data: T[] = [];

    function traverse(node: BSTNode<T>) {
      if (node.left) {
        traverse(node.left);
      }
      if (node.right) {
        traverse(node.right);
      }
      data.push(node.value);
    }

    if (this.root) {
      traverse(this.root);
    }

    return data;
  }

  // DFS Pre-Order (Root, Left, Right) - Итеративный
  dfsPreOrderIterative() {
    if (!this.root) {
      return [];
    }
    let data: T[] = [];
    let stack = [this.root];

    while (stack.length > 0) {
      let node = stack.pop();
      data.push(node!.value);

      // Сначала пушим ПРАВОЕ, потом ЛЕВОЕ,
      // чтобы левое оказалось сверху стека и обработалось первым
      if (node?.left) {
        stack.push(node.left);
      }
      if (node?.right) {
        stack.push(node.right);
      }
    }
    return data;
  }

  // DFS Post-Order (Left, Right, Root) - Итеративный (через два стека)
  dfsPostOrderIterative() {
    if (!this.root) {
      return [];
    }
    let data: T[] = [];
    let stack = [this.root];

    while (stack.length > 0) {
      let node = stack.pop();
      data.unshift(node!.value);

      if (node?.left) {
        stack.push(node.left);
      }
      if (node?.right) {
        stack.push(node.right);
      }
    }
    return data;
  }

  /**
   * Удаляет узел из дерева и перестраивает его, сохраняя свойства BST.
   * @param {*} value - Значение, которое нужно удалить.
   */
  deleteNode(value: T) {
    if (!this.root) {
      return false;
    }

    let current = this.root;
    let parent = null;

    while (current && current.value !== value) {
      parent = current;

      if (value < current.value) {
      }
    }
  }
}

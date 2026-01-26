class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Insert a value into the tree
  insert(value) {
    const newNode = new Node(value);
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

  // Find a value in the tree
  find(value) {
    if (!this.root) return false;
    let current = this.root;
    while (current) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        return current;
      }
    }
    return false;
  }

  // Breadth-First Search (Level-order Traversal)
  bfs() {
    let node = this.root,
      data = [],
      queue = [];
    queue.push(node);
    while (queue.length) {
      node = queue.shift();
      data.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return data;
  }

  // Depth-First Search (In-order: Left, Root, Right)
  dfsInOrder() {
    let data = [];

    function traverse(node) {
      data.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }

    traverse(this.root);
    return data;
  }

  // DFS Pre-order (Обход в прямом порядке) —
  // это способ обхода дерева, при котором мы посещаем узлы в последовательности:
  //   Корень → Лево → Право.
  dfsPreOrder() {
    let data = [];

    function traverse(node) {
      data.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }

    if (this.root) traverse(this.root);
    return data;
  }

  // DFS Post-order (Left, Right, Root)
  dfsPostOrder() {
    let data = [];

    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      data.push(node.value);
    }

    if (this.root) traverse(this.root);
    return data;
  }

  remove(value) {
    this.root = this._removeNode(this.root, value);
  }

  // DFS Pre-Order (Root, Left, Right) - Итеративный
  dfsPreOrderIterative() {
    if (!this.root) return [];

    let data = [];
    let stack = [this.root];

    while (stack.length > 0) {
      let node = stack.pop();
      data.push(node.value);

      // Сначала пушим ПРАВОЕ, потом ЛЕВОЕ,
      // чтобы левое оказалось сверху стека и обработалось первым
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }
    return data;
  }

  // DFS Post-Order (Left, Right, Root) - Итеративный (через два стека)
  dfsPostOrderIterative() {
    if (!this.root) return [];

    let data = [];
    let stack = [this.root];

    // Используем логику: (Root, Right, Left) и затем разворачиваем результат
    while (stack.length > 0) {
      let node = stack.pop();
      data.push(node.value);

      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
    }

    return data.reverse();
  }

  /**
   * Удаляет узел из дерева и перестраивает его, сохраняя свойства BST.
   * @param {*} value - Значение, которое нужно удалить.
   */
  deleteNode(value) {
    if (!this.root) return false;

    let current = this.root;
    let parent = null;

    // 1. Поиск удаляемого узла и его родителя
    while (current && current.value !== value) {
      parent = current;
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    // Если узел не найден
    if (!current) return false;

    // 2. Сценарий 1: У узла нет детей (листовой узел)
    if (!current.left && !current.right) {
      if (current === this.root) {
        this.root = null;
      } else if (parent.left === current) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }
    // 3. Сценарий 2: У узла только ОДИН ребенок
    else if (!current.left || !current.right) {
      let child = current.left ? current.left : current.right;

      if (current === this.root) {
        this.root = child;
      } else if (parent.left === current) {
        parent.left = child;
      } else {
        parent.right = child;
      }
    }
    // 4. Сценарий 3: У узла ДВА ребенка
    else {
      // Находим преемника (минимальный узел в правом поддереве)
      let successor = current.right;
      let successorParent = current;

      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }

      // Заменяем значение удаляемого узла значением преемника
      current.value = successor.value;

      // Удаляем узел-преемник (у него может быть максимум один правый ребенок)
      if (successorParent.left === successor) {
        successorParent.left = successor.right;
      } else {
        successorParent.right = successor.right;
      }
    }

    return true;
  }
}

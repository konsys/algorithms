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

export class BinarySearchTreeLesson<T extends number> {
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

    let current: BSTNode<T> | null = this.root;
    let parent = null;

    // --- ЭТАП 1: Поиск узла, который нужно удалить ---
    while (current && current.value !== value) {
      parent = current;

      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    if (!current) {
      return false;
    }
    // --- ЭТАП 2: Удаление найденного узла ---

    // СЦЕНАРИЙ 1: У узла НЕТ ДЕТЕЙ (он "листовой")
    if (!current.left && !current.right) {
      if (current === this.root) {
        this.root = null;
      } else if (parent?.left === current) {
        parent.left = null;
      } else {
        parent!.right = null;
      }
    }

    // СЦЕНАРИЙ 2: У узла ТОЛЬКО ОДИН ребенок
    else if (!current.left || !current.right) {
      let child = current.left ? current.left : current.right;

      if (current === this.root) {
        this.root = child;
      } else if (parent?.left === current) {
        parent.left = child;
      } else {
        parent!.right = child;
      }
    }

    // СЦЕНАРИЙ 3: У узла ДВА РЕБЕНКА (самый сложный случай)
    else {
      let successor = current.right;
      let successorParent = current;

      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }
      // Шаг "хитрости": мы не удаляем сам узел, а просто копируем
      // значение преемника в наш текущий узел.
      current.value = successor.value;

      if (successorParent.left === successor) {
        successorParent.left = successor.right;
      } else {
        successorParent.right = successor.right;
      }
    }
    return true;
  }

  printTreeIterative() {
    if (!this.root) return console.log('Дерево пустое');

    const getHeight = (node: BSTNode<T> | null): number =>
      node ? 1 + Math.max(getHeight(node.left), getHeight(node.right)) : 0;

    const h = getHeight(this.root);
    const res: string[][] = Array.from({ length: h * 2 }, () => []);
    const width = Math.pow(2, h - 1) * 4;

    const fill = (node: BSTNode<T> | null, r: number, c: number, w: number) => {
      if (!node) return;

      // Записываем значение узла
      res[r][c] = String(node.value);

      if (node.left) {
        // Рисуем линию влево
        res[r + 1][c - Math.floor(w / 4)] = '/';
        fill(node.left, r + 2, c - Math.floor(w / 2), Math.floor(w / 2));
      }
      if (node.right) {
        // Рисуем линию вправо
        res[r + 1][c + Math.floor(w / 4)] = '\\';
        fill(node.right, r + 2, c + Math.floor(w / 2), Math.floor(w / 2));
      }
    };

    fill(this.root, 0, width, width);

    // Сборка массива в строку
    const output = res
      .map((row) => {
        let line = '';
        for (let i = 0; i <= width * 2; i++) {
          line += row[i] || ' ';
        }
        return line.trimEnd();
      })
      .filter((line) => line.length > 0)
      .join('\n');

    console.log('\n' + output);
  }

  /**
   * Полная пересборка дерева для идеальной балансировки
   */
  rebalance() {
    const nodes: T[] = [];
    this._inOrderTraversal(this.root, nodes);

    // Передаем индексы как number
    this.root = this._buildBalancedTree(nodes, 0, nodes.length - 1);
  }

  _inOrderTraversal(node: BSTNode<T> | null, array: T[]) {
    if (node) {
      this._inOrderTraversal(node.left, array);
      array.push(node.value);
      this._inOrderTraversal(node.right, array);
    }
  }

  // start и end теперь строго number
  _buildBalancedTree(elements: T[], start: number, end: number): BSTNode<T> | null {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);

    // Создаем узел (предполагается наличие конструктора или интерфейса)
    const newNode: BSTNode<T> = {
      value: elements[mid],
      left: null,
      right: null,
    };

    newNode.left = this._buildBalancedTree(elements, start, mid - 1);
    newNode.right = this._buildBalancedTree(elements, mid + 1, end);

    return newNode; // ОБЯЗАТЕЛЬНО возвращаем узел
  }
}

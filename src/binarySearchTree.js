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
    // Если дерево пустое (корня нет), удалять нечего — возвращаем false
    if (!this.root) return false;

    let current = this.root; // Узел, который мы проверяем сейчас
    let parent = null; // Ссылка на родителя текущего узла

    // --- ЭТАП 1: Поиск узла, который нужно удалить ---
    // Цикл идет, пока не найдем узел или не дойдем до конца ветки
    while (current && current.value !== value) {
      parent = current; // Запоминаем текущий узел как родителя перед шагом глубже

      if (value < current.value) {
        current = current.left; // Если искомое меньше — идем влево
      } else {
        current = current.right; // Если больше — идем вправо
      }
    }

    // Если прошли всё дерево и не нашли значение (current стал null)
    if (!current) return false;

    // --- ЭТАП 2: Удаление найденного узла ---

    // СЦЕНАРИЙ 1: У узла НЕТ ДЕТЕЙ (он "листовой")
    if (!current.left && !current.right) {
      if (current === this.root) {
        this.root = null; // Если это был единственный узел в дереве (корень)
      } else if (parent.left === current) {
        parent.left = null; // Обнуляем ссылку у родителя слева
      } else {
        parent.right = null; // Обнуляем ссылку у родителя справа
      }
    }

    // СЦЕНАРИЙ 2: У узла ТОЛЬКО ОДИН ребенок
    else if (!current.left || !current.right) {
      // Выбираем, какой именно ребенок существует (левый или правый)
      let child = current.left ? current.left : current.right;

      if (current === this.root) {
        this.root = child; // Если удаляем корень, его ребенок становится новым корнем
      } else if (parent.left === current) {
        parent.left = child; // Родитель удаляемого узла теперь указывает на "внука" слева
      } else {
        parent.right = child; // Родитель удаляемого узла теперь указывает на "внука" справа
      }
    }

    // СЦЕНАРИЙ 3: У узла ДВА РЕБЕНКА (самый сложный случай)
    else {
      // Чтобы сохранить порядок в дереве, нам нужно найти "преемника" —
      // это самый маленький узел в ПРАВОМ поддереве.
      let successor = current.right;
      let successorParent = current;

      // Идем максимально влево в правом поддереве
      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }

      // Шаг "хитрости": мы не удаляем сам узел, а просто копируем
      // значение преемника в наш текущий узел.
      current.value = successor.value;

      // Теперь нужно удалить оригинал преемника.
      // У преемника точно нет левого ребенка, но может быть правый.
      if (successorParent.left === successor) {
        // Если преемник был левым ребенком, отдаем его правую ветку родителю влево
        successorParent.left = successor.right;
      } else {
        // Случай, если правое поддерево состояло всего из одного узла
        successorParent.right = successor.right;
      }
    }

    return true; // Узел успешно найден и удален
  }
}

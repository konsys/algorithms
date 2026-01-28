// const { performance } = require('perf_hooks');

// Вставляем ваш класс (сокращенно для примера)
class BSTNode<T> {
  value: T;
  left: BSTNode<T> | null = null;
  right: BSTNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class BinarySearchTreeLesson<T> {
  root: BSTNode<T> | null = null;

  insert(value: T) {
    const newNode = new BSTNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          break;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          break;
        }
        current = current.right;
      }
    }
  }

  dfsInOrder() {
    let data: T[] = [];

    function traverse(node: BSTNode<T> | null) {
      if (!node) return;
      traverse(node.left);
      data.push(node.value);
      traverse(node.right);
    }

    traverse(this.root);
    return data;
  }
}

function quickSort(arr: number[], left: number, right: number) {
  if (left >= right) return;
  let pivot = arr[Math.floor((left + right) / 2)];
  let i = left,
    j = right;
  while (i <= j) {
    while (arr[i] < pivot) i++;
    while (arr[j] > pivot) j--;
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }
  quickSort(arr, left, j);
  quickSort(arr, i, right);
}

class AVLTree<T> extends BinarySearchTreeLesson<T> {
  // Рекурсивная вставка с балансировкой
  avlInsert(node: BSTNode<T> | null, value: T): BSTNode<T> {
    if (!node) return new BSTNode(value);

    if (value < node.value) {
      node.left = this.avlInsert(node.left, value);
    } else if (value > node.value) {
      node.right = this.avlInsert(node.right, value);
    } else return node;

    const balance = this.getBalance(node);

    // Left Left
    if (balance > 1 && value < node.left!.value) return this.rotateRight(node);
    // Right Right
    if (balance < -1 && value > node.right!.value) return this.rotateLeft(node);
    // Left Right
    if (balance > 1 && value > node.left!.value) {
      node.left = this.rotateLeft(node.left!);
      return this.rotateRight(node);
    }
    // Right Left
    if (balance < -1 && value < node.right!.value) {
      node.right = this.rotateRight(node.right!);
      return this.rotateLeft(node);
    }

    return node;
  }

  insert(value: T) {
    this.root = this.avlInsert(this.root, value);
  }

  // Получаем высоту узла
  private height(node: BSTNode<T> | null): number {
    if (!node) return 0;
    let leftH = this.height(node.left);
    let rightH = this.height(node.right);
    return Math.max(leftH, rightH) + 1;
  }

  // Баланс: разница высот
  private getBalance(node: BSTNode<T> | null): number {
    return node ? this.height(node.left) - this.height(node.right) : 0;
  }

  // Правое вращение
  private rotateRight(y: BSTNode<T>): BSTNode<T> {
    let x = y.left!;
    let T2 = x.right;
    x.right = y;
    y.left = T2;
    return x;
  }

  // Левое вращение
  private rotateLeft(x: BSTNode<T>): BSTNode<T> {
    let y = x.right!;
    let T2 = y.left;
    y.left = x;
    x.right = T2;
    return y;
  }
}

async function run() {
  const count = 100;
  console.log(`\n🚀 Запуск теста на ${count.toLocaleString()} элементов...`);
  const data = Array.from({ length: count }, () => Math.floor(Math.random() * count));

  // 1. Native Sort
  const d1 = [...data];
  const s1 = performance.now();
  d1.sort((a, b) => a - b);
  console.log(`✅ Native Sort: ${(performance.now() - s1).toFixed(2)}ms`);

  // 2. QuickSort
  const d2 = [...data];
  const s2 = performance.now();
  quickSort(d2, 0, d2.length - 1);
  console.log(`✅ QuickSort:   ${(performance.now() - s2).toFixed(2)}ms`);

  // 3. BST
  const bst = new BinarySearchTreeLesson<number>();
  const s3 = performance.now();
  for (let v of data) bst.insert(v);
  bst.dfsInOrder();
  console.log(`✅ BST Tree:    ${(performance.now() - s3).toFixed(2)}ms`);

  // 4. AVL
  const avl = new AVLTree<number>();
  const s4 = performance.now();
  for (let v of data) avl.insert(v);
  avl.dfsInOrder();
  console.log(`✅ AVL Tree:    ${(performance.now() - s4).toFixed(2)}ms`);
}

run();

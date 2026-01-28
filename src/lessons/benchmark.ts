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

async function run() {
  const count = 10000000;
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
}

run();

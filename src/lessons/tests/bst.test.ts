import { BinarySearchTreeLesson } from '../binarySearchTreeLesson';

describe('BinarySearchTree', () => {
  let bst: BinarySearchTreeLesson<number>;

  // Перед каждым тестом создаем новый экземпляр дерева
  beforeEach(() => {
    bst = new BinarySearchTreeLesson<number>();
  });

  test('insert должен корректно вставлять значения', () => {
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);

    expect(bst.root!.value).toBe(10);
    expect(bst.root!.left!.value).toBe(5);
    expect(bst.root!.right!.value).toBe(15);
  });

  test('insert не должен вставлять дубликаты', () => {
    bst.insert(10);
    const result = bst.insert(10);
    expect(result).toBeUndefined();
  });

  test('insert должен корректно вставлять значения', () => {
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);

    expect(bst.root!.value).toBe(10);
    expect(bst.root!.left!.value).toBe(5); // Убран "!" в начале
    expect(bst.root!.right!.value).toBe(15);
  });

  test('find метод find должен находить существующие узлы', () => {
    bst.insert(10);
    bst.insert(5);
    bst.insert(13);

    const found = bst.find(13);
    expect(found?.value).toBe(13);
    expect(found?.left).toBeNull();
  });

  test('find метод find должен возвращать null для отсутствующих значений', () => {
    bst.insert(10);
    expect(bst.find(99)).toBe(null);
  });

  test('BFS (обход в ширину) должен возвращать данные по уровням', () => {
    // Структура:
    //      10
    //    /    \
    //   5      15
    //  / \       \
    // 2   8      20
    [10, 5, 15, 2, 8, 20].forEach((val) => bst.insert(val));

    expect(bst.bfs()).toEqual([10, 5, 15, 2, 8, 20]);
  });

  test('dfsInOrder должен возвращать отсортированный массив', () => {
    [10, 5, 15, 2, 8].forEach((val) => bst.insert(val));

    // Ожидаем порядок: Left -> Root -> Right
    expect(bst.dfsInOrder()).toEqual([2, 5, 8, 10, 15]);
  });

  test('dfsPreOrder should return an empty array for an empty tree', () => {
    // Note: Ensure your implementation handles null root (see tip below)
    expect(bst.dfsPreOrder()).toEqual([]);
  });

  test('dfsPreOrder should return nodes in Pre-Order (Root -> Left -> Right)', () => {
    /*
       Tree Structure:
             10
            /  \
           5    15
          / \     \
         2   7     20
    */
    [10, 5, 15, 2, 7, 20].forEach((val) => bst.insert(val));

    const expected = [10, 5, 2, 7, 15, 20];
    expect(bst.dfsPreOrder()).toEqual(expected);
  });

  test('dfsPreOrder should work correctly on a single-node tree', () => {
    bst.insert(50);
    expect(bst.dfsPreOrder()).toEqual([50]);
  });

  test('dfsPreOrder should handle a left-heavy (unbalanced) tree', () => {
    // Tree: 10 -> 8 -> 6 -> 4
    [10, 8, 6, 4].forEach((val) => bst.insert(val));

    const expected = [10, 8, 6, 4];
    expect(bst.dfsPreOrder()).toEqual(expected);
  });

  test('dfsPreOrder should handle a right-heavy (unbalanced) tree', () => {
    // Tree: 10 -> 12 -> 14 -> 16
    [10, 12, 14, 16].forEach((val) => bst.insert(val));

    const expected = [10, 12, 14, 16];
    expect(bst.dfsPreOrder()).toEqual(expected);
  });

  test('dfsPostOrder should return an empty array for an empty tree', () => {
    expect(bst.dfsPostOrder()).toEqual([]);
  });

  test('dfsPostOrder should return a single value for a tree with one node', () => {
    bst.insert(10);
    expect(bst.dfsPostOrder()).toEqual([10]);
  });

  test('dfsPostOrder should return nodes in Post-Order (Left -> Right -> Root)', () => {
    /*
       Tree Structure:
             10
            /  \
           5    15
          / \     \
         2   7     20

       Logic:
       1. Left Subtree (5, 2, 7) -> [2, 7, 5]
       2. Right Subtree (15, 20) -> [20, 15]
       3. Root (10)              -> [10]
    */
    [10, 5, 15, 2, 7, 20].forEach((val) => bst.insert(val));

    const expected = [2, 7, 5, 20, 15, 10];
    expect(bst.dfsPostOrder()).toEqual(expected);
  });

  test('dfsPostOrder should handle a "Right-Skewed" tree correctly', () => {
    // 10 -> 20 -> 30
    [10, 20, 30].forEach((val) => bst.insert(val));
    // Path: Right, Right, Root
    expect(bst.dfsPostOrder()).toEqual([30, 20, 10]);
  });

  test('dfsPostOrder should handle a "Left-Skewed" tree correctly', () => {
    // 10 -> 5 -> 2
    [10, 5, 2].forEach((val) => bst.insert(val));
    // Path: Left, Left, Root
    expect(bst.dfsPostOrder()).toEqual([2, 5, 10]);
  });

  test('dfsPostOrder should work with complex structures', () => {
    /*
          15
         /  \
        10   25
            /  \
           20   30
    */
    [15, 10, 25, 20, 30].forEach((val) => bst.insert(val));
    expect(bst.dfsPostOrder()).toEqual([10, 20, 30, 25, 15]);
  });

  test('dfsPreOrderIterative: должен вернуть элементы в порядке вставки (Root -> Right)', () => {
    // Структура: 10 -> 20 -> 30
    [10, 20, 30].forEach((val) => bst.insert(val));

    // В Pre-Order: сначала корень, потом правый потомок
    const expected = [10, 20, 30];
    expect(bst.dfsPreOrderIterative()).toEqual(expected);
  });

  test('dfsPostOrderIterative: должен вернуть элементы в обратном порядке (Bottom-Up)', () => {
    // Структура: 10 -> 20 -> 30
    [10, 20, 30].forEach((val) => bst.insert(val));
    // В Post-Order: самый глубокий элемент (30) будет первым, корень (10) — последним
    const expected = [30, 20, 10];
    expect(bst.dfsPostOrderIterative()).toEqual(expected);
  });

  test('dfsPostOrderIterative должен корректно работать с пустым деревом', () => {
    expect(bst.dfsPreOrderIterative()).toEqual([]);
    expect(bst.dfsPostOrderIterative()).toEqual([]);
  });
});

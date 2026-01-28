import { BinarySearchTreeLesson } from '../binarySearchTreeLesson';

describe('BinarySearchTree', () => {
  let bst: BinarySearchTreeLesson<number>;

  // Перед каждым тестом создаем новый экземпляр дерева
  beforeEach(() => {
    bst = new BinarySearchTreeLesson<number>();
  });

  let bstd: BinarySearchTreeLesson<number>;

  beforeEach(() => {
    bstd = new BinarySearchTreeLesson<number>();
    // Создаем базовое дерево:
    //       10
    //      /  \
    //     5    15
    //    / \   / \
    //   3   7 12  18
    [10, 5, 15, 3, 7, 12, 18].forEach((val) => bstd.insert(val));
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

  test('delete должен вернуть false, если узел не найден', () => {
    expect(bstd.deleteNode(100)).toBe(false);
  });

  test('delete СЦЕНАРИЙ 1: Удаление листа (узла без детей)', () => {
    /*
         10
        /  \
       5    15
      /  \
     3    7
   */
    // Наполняем дерево
    [10, 5, 15, 3, 7].forEach((v) => bst.insert(v));

    // Удаляем лист (3)
    const result = bst.deleteNode(3);

    /*
        10
       /  \
      5    15
        \
         7
  */

    expect(result).toBe(true);

    // Проверяем родителя (5): его левый ребенок должен стать null
    const node5 = bst.find(5);
    expect(node5).not.toBeNull();
    expect(node5!.left).toBeNull();

    // Проверяем, что самого узла больше нет в дереве
    expect(bst.find(3)).toBeNull();
  });

  test('delete СЦЕНАРИЙ 2: Удаление узла с одним ребенком', () => {
    const bst1 = new BinarySearchTreeLesson<number>();
    [10, 5, 15, 3, 7, 12, 18].forEach((val) => bst1.insert(val));
    /*
           10
        /      \
       5        15
      /  \     /   \
     3    7   12    18

     */
    bst1.deleteNode(3); // Сначала сделаем 5 узлом с одним ребенком (7)
    expect(bst1.deleteNode(5)).toBe(true);
    expect(bst1.root?.left?.value).toBe(7);
  });

  test('delete СЦЕНАРИЙ 3: Удаление узла с двумя детьми (через преемника)', () => {
    const bst1 = new BinarySearchTreeLesson<number>();
    [10, 5, 15, 3, 7, 12, 18].forEach((val) => bst1.insert(val));

    bst1.printTreeIterative();
    /*
                     10
                  /       \
              5               15
            /   \           /   \
          3       7       12       18


    */

    expect(bst1.deleteNode(15)).toBe(true);
    // Преемник для 15 в этом дереве — 18 (или 12, если идти вглубь)
    // В вашем коде это successor = current.right, затем вглубь влево.
    // Для 15 это будет 18 (если у 18 нет левого ребенка)
    expect(bst1.root?.right?.value).toBe(18);
    expect(bst1.root?.right?.left?.value).toBe(12);
  });

  test('delete СЦЕНАРИЙ 3: Удаление узла с двумя детьми (через преемника)', () => {
    const bst1 = new BinarySearchTreeLesson<number>();
    [10, 5, 15, 3, 7, 12, 18].forEach((val) => bst1.insert(val));

    bst1.printTreeIterative();
    /*
                     10
                  /       \
              5               15
            /   \           /   \
          3       7       12       18


    */

    expect(bst1.deleteNode(10)).toBe(true);

    // В вашем коде это successor = current.right, затем вглубь влево.
    // Для 10 это будет 12 (если у 18 нет левого ребенка)
    expect(bst1.root?.right?.value).toBe(15);
    expect(bst1.root?.right?.right?.value).toBe(18);
  });

  test('delete Удаление корня дерева', () => {
    const bst1 = new BinarySearchTreeLesson<number>();
    [10, 5, 15, 3, 7, 12, 18].forEach((val) => bst1.insert(val));

    expect(bstd.deleteNode(10)).toBe(true);
    expect(bstd.root?.value).toBe(12); // 12 станет новым корнем (преемник 10)
  });

  test('delete Удаление последнего узла (очистка дерева)', () => {
    const singleBst = new BinarySearchTreeLesson<number>();
    singleBst.insert(50);
    expect(singleBst.deleteNode(50)).toBe(true);
    expect(singleBst.root).toBeNull();
  });

  test('delete Удаление последнего узла (очистка дерева)', () => {
    const bst1 = new BinarySearchTreeLesson<number>();
    [10, 5, 15, 3, 7, 12, 18].forEach((val) => bst1.insert(val));

    bst1.printTreeIterative();

    bst1.rebalance();
    bst1.printTreeIterative();
    expect(bst1.root?.value).toBe(10);
  });
});

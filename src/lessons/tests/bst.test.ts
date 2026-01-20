import { BinarySearchTreeLesson } from '../binarySearchTreeLesson';

describe('BinarySearchTree', () => {
  let bst: BinarySearchTreeLesson<number>;

  // Перед каждым тестом создаем новый экземпляр дерева
  beforeEach(() => {
    bst = new BinarySearchTreeLesson<number>();
  });

  test('должен корректно вставлять значения', () => {
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);

    expect(bst.root!.value).toBe(10);
    expect(!bst.root!.left!.value).toBe(5);
    expect(bst.root!.right!.value).toBe(15);
  });

  test('не должен вставлять дубликаты', () => {
    bst.insert(10);
    const result = bst.insert(10);
    expect(result).toBeUndefined();
  });

  test('должен корректно вставлять значения', () => {
    bst.insert(10);
    bst.insert(5);
    bst.insert(15);

    expect(bst.root!.value).toBe(10);
    expect(bst.root!.left!.value).toBe(5); // Убран "!" в начале
    expect(bst.root!.right!.value).toBe(15);
  });

  test('метод find должен находить существующие узлы', () => {
    bst.insert(10);
    bst.insert(5);
    bst.insert(13);

    const found = bst.find(13);
    expect(found?.value).toBe(13);
    expect(found?.left).toBeNull();
  });

  test('метод find должен возвращать false для отсутствующих значений', () => {
    bst.insert(10);
    expect(bst.find(99)).toBe(null);
  });

  // test('BFS (обход в ширину) должен возвращать данные по уровням', () => {
  //   // Структура:
  //   //      10
  //   //    /    \
  //   //   5      15
  //   //  / \       \
  //   // 2   8      20
  //   [10, 5, 15, 2, 8, 20].forEach((val) => bst.insert(val));
  //
  //   expect(bst.bfs()).toEqual([10, 5, 15, 2, 8, 20]);
  // });
  //
  // test('dfsInOrder должен возвращать отсортированный массив', () => {
  //   [10, 5, 15, 2, 8].forEach((val) => bst.insert(val));
  //
  //   // Ожидаем порядок: Left -> Root -> Right
  //   expect(bst.dfsInOrder()).toEqual([2, 5, 8, 10, 15]);
  // });
  //
  // test('dfsPreOrder должен возвращать порядок Root -> Left -> Right', () => {
  //   [10, 5, 15].forEach((val) => bst.insert(val));
  //   expect(bst.dfsPreOrder()).toEqual([10, 5, 15]);
  // });
  //
  // test('dfsPostOrder должен возвращать порядок Left -> Right -> Root', () => {
  //   [10, 5, 15].forEach((val) => bst.insert(val));
  //   expect(bst.dfsPostOrder()).toEqual([5, 15, 10]);
  // });
});

// Помощник: Массив -> Связный список
import { ListNode, rotateRight } from '../rotateList';

function arrayToList(arr: number[]): ListNode | null {
  if (!arr.length) return null;
  let head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// Помощник: Связный список -> Массив
function listToArray(head: ListNode | null): number[] {
  let res: number[] = [];
  while (head) {
    res.push(head.val);
    head = head.next;
  }
  return res;
}

describe.skip('rotateRight', () => {
  test('Пример 1: [1,2,3,4,5], k = 2 => [4,5,1,2,3]', () => {
    const head = arrayToList([1, 2, 3, 4, 5]);
    const result = rotateRight(head, 2);
    expect(listToArray(result)).toEqual([4, 5, 1, 2, 3]);
  });

  test('Пример 2: [0,1,2], k = 4 => [2,0,1]', () => {
    const head = arrayToList([0, 1, 2]);
    const result = rotateRight(head, 4); // 4 % 3 = 1 сдвиг
    expect(listToArray(result)).toEqual([2, 0, 1]);
  });

  test('Пустой список: [], k = 5 => []', () => {
    const head = arrayToList([]);
    const result = rotateRight(head, 5);
    expect(listToArray(result)).toEqual([]);
  });

  test('k кратно длине списка: [1,2], k = 2 => [1,2]', () => {
    const head = arrayToList([1, 2]);
    const result = rotateRight(head, 2);
    expect(listToArray(result)).toEqual([1, 2]);
  });

  test('k = 0: [1,2,3], k = 0 => [1,2,3]', () => {
    const head = arrayToList([1, 2, 3]);
    const result = rotateRight(head, 0);
    expect(listToArray(result)).toEqual([1, 2, 3]);
  });

  // 1. Пустой список
  test('Пустой список: head = [], k = 1 => []', () => {
    const head = arrayToList([]);
    const result = rotateRight(head, 1);
    expect(listToArray(result)).toEqual([]);
  });

  // 2. Список из одного элемента (любое k не должно его изменить)
  test('Один элемент: head = [1], k = 99 => [1]', () => {
    const head = arrayToList([1]);
    const result = rotateRight(head, 99);
    expect(listToArray(result)).toEqual([1]);
  });

  // 3. k равно 0 (никаких изменений)
  test('k равно 0: head = [1,2], k = 0 => [1,2]', () => {
    const head = arrayToList([1, 2]);
    const result = rotateRight(head, 0);
    expect(listToArray(result)).toEqual([1, 2]);
  });

  // 4. k кратно длине списка (полный оборот возвращает оригинал)
  test('k кратно длине: head = [1,2,3], k = 6 => [1,2,3]', () => {
    const head = arrayToList([1, 2, 3]);
    const result = rotateRight(head, 6);
    expect(listToArray(result)).toEqual([1, 2, 3]);
  });

  // 5. Огромное значение k (проверка на эффективность k % length)
  test('Огромное k: head = [1,2], k = 2000001 => [2,1]', () => {
    const head = arrayToList([1, 2]);
    // 2000001 % 2 = 1 сдвиг
    const result = rotateRight(head, 2000001);
    expect(listToArray(result)).toEqual([2, 1]);
  });

  // 6. k больше длины списка (обычный случай для оптимизации)
  test('k больше длины: head = [0,1,2], k = 4 => [2,0,1]', () => {
    const head = arrayToList([0, 1, 2]);
    // 4 % 3 = 1 сдвиг
    const result = rotateRight(head, 4);
    expect(listToArray(result)).toEqual([2, 0, 1]);
  });
});

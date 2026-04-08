import { searchRange } from '../searchRange/searchRange';

describe.skip('Find First and Last Position of Element in Sorted Array', () => {
  test('Стандартный случай: несколько вхождений в середине', () => {
    expect(searchRange([5, 7, 7, 8, 8, 10], 8)).toEqual([3, 4]);
  });

  test('Элемент отсутствует в массиве', () => {
    expect(searchRange([5, 7, 7, 8, 8, 10], 6)).toEqual([-1, -1]);
  });

  test('Пустой массив', () => {
    expect(searchRange([], 0)).toEqual([-1, -1]);
  });

  test('Массив из одного элемента (target найден)', () => {
    expect(searchRange([5], 5)).toEqual([0, 0]);
  });

  test('Массив из одного элемента (target не найден)', () => {
    expect(searchRange([5], 8)).toEqual([-1, -1]);
  });

  test('Все элементы массива одинаковы и равны target', () => {
    expect(searchRange([2, 2, 2, 2, 2], 2)).toEqual([0, 4]);
  });

  test('Target находится в самом начале и в самом конце', () => {
    expect(searchRange([1, 1, 2, 3, 4, 4, 4], 4)).toEqual([4, 6]);
    expect(searchRange([1, 1, 1, 2, 3], 1)).toEqual([0, 2]);
  });

  test('Target — минимальное или максимальное число вне диапазона', () => {
    expect(searchRange([1, 2, 3], 0)).toEqual([-1, -1]);
    expect(searchRange([1, 2, 3], 4)).toEqual([-1, -1]);
  });
});

// Импортируем нашу функцию (предположим, она экспортирована из файла solution.ts)
// import { fourSum } from './solution';

import { fourSum } from '../4sum/4sum';

describe.skip('4Sum Problem', () => {
  // Вспомогательная функция для сравнения результатов без учета порядка
  const sortResult = (arr: number[][]) =>
    arr.map((sub) => sub.sort((a, b) => a - b)).sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  test('Пример 1: Стандартный массив с несколькими решениями', () => {
    const nums = [1, 0, -1, 0, -2, 2];
    const target = 0;
    const expected = [
      [-2, -1, 1, 2],
      [-2, 0, 0, 2],
      [-1, 0, 0, 1],
    ];

    const result = fourSum(nums, target);
    expect(sortResult(result)).toEqual(sortResult(expected));
  });

  test('Пример 2: Массив из одинаковых чисел', () => {
    const nums = [2, 2, 2, 2, 2];
    const target = 8;
    const expected = [[2, 2, 2, 2]];

    const result = fourSum(nums, target);
    expect(sortResult(result)).toEqual(sortResult(expected));
  });

  test('Случай с отрицательным target', () => {
    const nums = [1, -2, -5, -4, -3, 3, 3, 5];
    const target = -11;
    // -5 + -4 + -2 + 0... проверим одну комбинацию: [-5, -4, -3, 1] = -11
    const expected = [[-5, -4, -3, 1]];

    const result = fourSum(nums, target);
    expect(sortResult(result)).toEqual(sortResult(expected));
  });

  test('Массив слишком мал (меньше 4 элементов)', () => {
    const nums = [1, 2, 3];
    const target = 6;
    expect(fourSum(nums, target)).toEqual([]);
  });

  test('Решений не существует', () => {
    const nums = [1, 1, 1, 1];
    const target = 100;
    expect(fourSum(nums, target)).toEqual([]);
  });

  test('Работа с большими числами (Integer Overflow Check)', () => {
    const nums = [1000000000, 1000000000, 1000000000, 1000000000];
    const target = 4000000000;
    const expected = [[1000000000, 1000000000, 1000000000, 1000000000]];

    const result = fourSum(nums, target);
    expect(sortResult(result)).toEqual(sortResult(expected));
  });
});

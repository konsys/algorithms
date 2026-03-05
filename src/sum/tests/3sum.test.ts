import { threeSum } from '../3sum/3sum';

describe('15. 3Sum', () => {
  // Универсальная функция для сравнения массивов без учета порядка
  const normalize = (arr: number[][]): number[][] => {
    return arr
      .map((triplet) => [...triplet].sort((a, b) => a - b)) // Сортируем числа внутри тройки
      .sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]); // Сортируем сами тройки
  };

  test('должен находить все уникальные тройки (Пример 1)', () => {
    const nums = [-1, 0, 1, 2, -1, -4];
    const expected = [
      [-1, -1, 2],
      [-1, 0, 1],
    ];
    const result = threeSum(nums);
    expect(normalize(result)).toEqual(normalize(expected));
  });

  test('должен возвращать пустой массив, если тройки не найдены', () => {
    expect(threeSum([0, 1, 1])).toEqual([]);
  });

  test('должен обрабатывать случай с тремя нулями', () => {
    expect(threeSum([0, 0, 0])).toEqual([[0, 0, 0]]);
  });

  test('не должен возвращать дубликаты при наличии множества одинаковых чисел', () => {
    const nums = [-2, 0, 0, 2, 2];
    const expected = [[-2, 0, 2]];
    expect(normalize(threeSum(nums))).toEqual(normalize(expected));
  });

  test('должен работать на пустом массиве или массиве короче 3 элементов', () => {
    expect(threeSum([])).toEqual([]);
    expect(threeSum([0, 0])).toEqual([]);
    expect(threeSum([0])).toEqual([]);
  });

  test('Массив из множества нулей должен возвращать только ОДНУ тройку [[0,0,0]]', () => {
    expect(threeSum([0, 0, 0, 0, 0, 0])).toEqual([[0, 0, 0]]);
  });

  test('Массив без возможных решений (все положительные или отрицательные)', () => {
    expect(threeSum([1, 2, 3, 4, 5])).toEqual([]);
    expect(threeSum([-1, -2, -3, -4, -5])).toEqual([]);
  });

  test('Обработка максимально больших и маленьких чисел', () => {
    const nums = [-100000, 0, 100000];
    expect(threeSum(nums)).toEqual([[-100000, 0, 100000]]);
  });

  test('Массив с дубликатами, дающими разные тройки', () => {
    const nums = [-2, 0, 1, 1, 2];
    const expected = [
      [-2, 0, 2],
      [-2, 1, 1],
    ];
    expect(normalize(threeSum(nums))).toEqual(normalize(expected));
  });

  test('Должен корректно обрабатывать повторяющиеся числа и не зависать', () => {
    const nums = [-2, 0, 0, 0, 2, 2, 2];
    const result = threeSum(nums);
    expect(result.length).toBe(1);
    expect([...result[0]].sort((a, b) => a - b)).toEqual([-2, 0, 2]);
  });

  test('должен находить несколько троек в больших массивах и проверять их сумму', () => {
    const nums = [-4, -2, -2, -2, 0, 1, 2, 2, 2, 3, 3, 4, 4, 6, 6];
    const result = threeSum(nums);

    result.forEach((triplet) => {
      const sum = triplet.reduce((a, b) => a + b, 0);
      expect(sum).toBe(0);
    });

    const uniqueStrings = new Set(result.map((t) => [...t].sort((a, b) => a - b).join(',')));
    expect(uniqueStrings.size).toBe(result.length);
  });
});

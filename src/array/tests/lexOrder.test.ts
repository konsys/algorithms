import { nextPermutation } from '../lexOrder/lexOrder';

describe.skip('nextPermutation', () => {
  test('должен найти следующую лексикографическую перестановку для [1, 2, 3]', () => {
    const nums = [1, 2, 3];
    nextPermutation(nums);
    expect(nums).toEqual([1, 3, 2]);
  });

  test('должен переставить в минимальный порядок, если это последняя перестановка', () => {
    const nums = [3, 2, 1];
    nextPermutation(nums);
    expect(nums).toEqual([1, 2, 3]);
  });

  test('должен корректно работать с дубликатами [1, 1, 5]', () => {
    const nums = [1, 1, 5];
    nextPermutation(nums);
    expect(nums).toEqual([1, 5, 1]);
  });

  test('должен найти следующую перестановку для [1, 3, 2]', () => {
    const nums = [1, 3, 2];
    nextPermutation(nums);
    expect(nums).toEqual([2, 1, 3]);
  });

  test('должен корректно работать с массивом из одного элемента', () => {
    const nums = [1];
    nextPermutation(nums);
    expect(nums).toEqual([1]);
  });

  test('сложный случай: [2, 3, 1] -> [3, 1, 2]', () => {
    const nums = [2, 3, 1];
    nextPermutation(nums);
    expect(nums).toEqual([3, 1, 2]);
  });
  // 1. Базовые случаи
  test('стандартный переход: [1, 2, 3] -> [1, 3, 2]', () => {
    const nums = [1, 2, 3];
    nextPermutation(nums);
    expect(nums).toEqual([1, 3, 2]);
  });

  // 2. Крайний случай: Максимальная перестановка (должен вернуться к началу)
  test('полный реверс: [3, 2, 1] -> [1, 2, 3]', () => {
    const nums = [3, 2, 1];
    nextPermutation(nums);
    expect(nums).toEqual([1, 2, 3]);
  });

  // 3. Дубликаты
  test('массив с повторяющимися числами: [1, 1, 5] -> [1, 5, 1]', () => {
    const nums = [1, 1, 5];
    nextPermutation(nums);
    expect(nums).toEqual([1, 5, 1]);
  });

  test('все элементы одинаковые: [1, 1, 1] -> [1, 1, 1]', () => {
    const nums = [1, 1, 1];
    nextPermutation(nums);
    expect(nums).toEqual([1, 1, 1]);
  });

  // 4. Минимальные массивы
  test('пустой массив: [] -> []', () => {
    const nums: number[] = [];
    nextPermutation(nums);
    expect(nums).toEqual([]);
  });

  test('один элемент: [1] -> [1]', () => {
    const nums = [1];
    nextPermutation(nums);
    expect(nums).toEqual([1]);
  });

  // 5. Отрицательные числа
  test('работа с отрицательными числами: [-3, -2, -1] -> [-3, -1, -2]', () => {
    const nums = [-3, -2, -1];
    nextPermutation(nums);
    expect(nums).toEqual([-3, -1, -2]);
  });

  // 6. Сложные переходы (длинный "хвост")
  test('перегиб в начале массива: [2, 3, 1] -> [3, 1, 2]', () => {
    const nums = [2, 3, 1];
    nextPermutation(nums);
    expect(nums).toEqual([3, 1, 2]);
  });

  test('числа с плато (несколько одинаковых при поиске замены): [1, 5, 8, 4, 7, 6, 5, 3, 1] -> [1, 5, 8, 5, 1, 3, 4, 6, 7]', () => {
    const nums = [1, 5, 8, 4, 7, 6, 5, 3, 1];
    nextPermutation(nums);
    // 4 меняется на 5 (последнюю пятерку), хвост разворачивается
    expect(nums).toEqual([1, 5, 8, 5, 1, 3, 4, 6, 7]);
  });

  // 7. Два элемента
  test('два элемента: [1, 2] -> [2, 1]', () => {
    const nums = [1, 2];
    nextPermutation(nums);
    expect(nums).toEqual([2, 1]);
  });
});

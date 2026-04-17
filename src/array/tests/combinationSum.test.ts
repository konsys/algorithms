import { combinationSum } from '../combinationSum/combinationSum';

describe.skip('combinationSum', () => {
  test('базовый случай: находит несколько комбинаций', () => {
    const candidates = [2, 3, 6, 7];
    const target = 7;
    const result = combinationSum(candidates, target);

    expect(result).toHaveLength(2);
    expect(result).toContainEqual([2, 2, 3]);
    expect(result).toContainEqual([7]);
  });

  test('случай с повторяющимся использованием чисел', () => {
    const candidates = [2, 3, 5];
    const target = 8;
    const result = combinationSum(candidates, target);

    // Ожидаемые комбинации: [2,2,2,2], [2,3,3], [3,5]
    expect(result).toHaveLength(3);
    expect(result).toContainEqual([2, 2, 2, 2]);
    expect(result).toContainEqual([2, 3, 3]);
    expect(result).toContainEqual([3, 5]);
  });

  test('возвращает пустой массив, если решений нет', () => {
    const candidates = [2];
    const target = 1;
    const result = combinationSum(candidates, target);

    expect(result).toEqual([]);
  });

  test('работает, когда target совпадает с одним из элементов', () => {
    const candidates = [1];
    const target = 1;
    const result = combinationSum(candidates, target);

    expect(result).toEqual([[1]]);
  });

  test('корректно обрабатывает большие числа, когда нет решения', () => {
    const candidates = [10, 20, 30];
    const target = 5;
    const result = combinationSum(candidates, target);

    expect(result).toEqual([]);
  });

  test('справляется с длинным путем из маленьких чисел', () => {
    const candidates = [1];
    const target = 5;
    const result = combinationSum(candidates, target);

    expect(result).toEqual([[1, 1, 1, 1, 1]]);
  });
});

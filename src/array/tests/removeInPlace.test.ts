import { removeElement } from '../removeInPlace/removeInPlace';

describe.skip('removeElement (TypeScript)', () => {
  // Вспомогательная функция для проверки первых k элементов
  const checkResult = (nums: number[], k: number, expected: number[]) => {
    const actual = nums.slice(0, k).sort((a, b) => a - b);
    const expectedSorted = [...expected].sort((a, b) => a - b);
    expect(actual).toEqual(expectedSorted);
  };

  test('Пример 1: nums = [3,2,2,3], val = 3', () => {
    const nums: number[] = [3, 2, 2, 3];
    const val: number = 3;
    const k = removeElement(nums, val);

    expect(k).toBe(2);
    checkResult(nums, k, [2, 2]);
  });

  test('Пример 2: nums = [0,1,2,2,3,0,4,2], val = 2', () => {
    const nums: number[] = [0, 1, 2, 2, 3, 0, 4, 2];
    const val: number = 2;
    const k = removeElement(nums, val);

    expect(k).toBe(5);
    checkResult(nums, k, [0, 1, 3, 0, 4]);
  });

  test('Все элементы равны val', () => {
    const nums: number[] = [2, 2, 2];
    const val: number = 2;
    const k = removeElement(nums, val);

    expect(k).toBe(0);
  });

  test('В массиве нет искомого val', () => {
    const nums: number[] = [1, 2, 3];
    const val: number = 5;
    const k = removeElement(nums, val);

    expect(k).toBe(3);
    checkResult(nums, k, [1, 2, 3]);
  });

  test('Пустой массив', () => {
    const nums: number[] = [];
    const val: number = 0;
    const k = removeElement(nums, val);

    expect(k).toBe(0);
    expect(nums).toEqual([]);
  });

  test('Массив из одного элемента, равного val', () => {
    const nums: number[] = [1];
    const val: number = 1;
    const k = removeElement(nums, val);

    expect(k).toBe(0);
  });
});

import { removeDuplicates } from '../removeDuplicates/removeDuplicates';

describe.skip('Remove Duplicates from Sorted Array', () => {
  test('базовый пример с небольшим количеством дубликатов', () => {
    const nums = [1, 1, 2];
    const expectedNums = [1, 2];

    const k = removeDuplicates(nums);

    expect(k).toBe(expectedNums.length);
    for (let i = 0; i < k; i++) {
      expect(nums[i]).toBe(expectedNums[i]);
    }
  });

  test('длинный массив с множественными повторениями', () => {
    const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
    const expectedNums = [0, 1, 2, 3, 4];

    const k = removeDuplicates(nums);

    expect(k).toBe(expectedNums.length);
    for (let i = 0; i < k; i++) {
      expect(nums[i]).toBe(expectedNums[i]);
    }
  });

  test('пустой массив', () => {
    const nums: number[] = [];
    const k = removeDuplicates(nums);
    expect(k).toBe(0);
  });

  test('массив без дубликатов', () => {
    const nums = [1, 2, 3, 4, 5];
    const k = removeDuplicates(nums);
    expect(k).toBe(5);
    expect(nums.slice(0, k)).toEqual([1, 2, 3, 4, 5]);
  });

  test('массив, где все элементы одинаковые', () => {
    const nums = [1, 1, 1, 1];
    const k = removeDuplicates(nums);
    expect(k).toBe(1);
    expect(nums[0]).toBe(1);
  });
});

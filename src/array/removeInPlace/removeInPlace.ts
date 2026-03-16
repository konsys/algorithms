/**
 * Удаляет все вхождения заданного значения из массива на месте (in-place).
 *
 * @param {number[]} nums - Массив целых чисел, который нужно изменить.
 * @param {number} val - Значение, которое необходимо удалить из массива.
 * @returns {number} k - Количество элементов в массиве, не равных значению val.
 *
 * @description
 * Алгоритм должен изменить массив так, чтобы первые 'k' элементов содержали числа,
 * отличные от 'val'. Порядок оставшихся элементов не важен.
 *
 * Особенности:
 * 1. Массив должен быть изменен "на месте" (с использованием O(1) дополнительной памяти).
 * 2. Элементы массива за пределами первых 'k' могут быть любыми.
 *
 * Пример:
 * nums = [3, 2, 2, 3], val = 3 => k = 2, nums = [2, 2, _, _]
 */
export function removeElement(nums: number[], val: number): number {
  if (!nums.length) {
    return 0;
  }
  let counter = 0;
  let slow = 0;
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast];
      counter++;
      slow++;
    }
  }
  return counter;
}

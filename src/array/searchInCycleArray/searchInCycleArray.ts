function search(nums: number[], target: number): number {
  let left: number = 0;
  let right: number = nums.length - 1;

  while (left <= right) {
    // Находим середину (используем Math.floor для целого числа)
    const mid: number = Math.floor(left + (right - left) / 2);

    // 1. Проверяем, не нашли ли мы цель сразу
    if (nums[mid] === target) {
      return mid;
    }

    // 2. Определяем, какая часть массива отсортирована «правильно»

    // Если левый элемент меньше или равен среднему — левая часть отсортирована
    if (nums[left] <= nums[mid]) {
      // Проверяем, попадает ли target в этот диапазон [left...mid]
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1; // Идем искать в левую часть
      } else {
        left = mid + 1; // Идем искать в правую часть
      }
    }
    // Иначе — правая часть [mid...right] точно отсортирована
    else {
      // Проверяем, попадает ли target в этот диапазон [mid...right]
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1; // Идем искать в правую часть
      } else {
        right = mid - 1; // Идем искать в левую часть
      }
    }
  }

  // Если цикл закончился и мы ничего не вернули — числа нет в массиве
  return -1;
}

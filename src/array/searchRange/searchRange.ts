export function searchRange(nums: number[], target: number): number[] {
  const findBound = (isFirst: boolean): number => {
    let start = 0;
    let end = nums.length - 1;
    let bound = -1;

    while (start <= end) {
      // ПРАВИЛЬНЫЙ расчет середины
      const mid = Math.floor(start + (end - start) / 2);

      if (nums[mid] === target) {
        bound = mid;
        if (isFirst) {
          end = mid - 1; // "Зажимаем" поиск влево
        } else {
          start = mid + 1; // "Зажимаем" поиск вправо
        }
      } else if (nums[mid] < target) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
    return bound;
  };

  return [findBound(true), findBound(false)];
}

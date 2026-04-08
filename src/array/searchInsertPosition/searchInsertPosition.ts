export const searchInsertPosition = (ar: number[], target: number) => {
  if (!ar.length) {
    return 0;
  }

  let left = 0;
  let right = ar.length - 1;

  while (left <= right) {
    let bound = left + Math.floor((right - left) / 2);
    if (ar[bound] === target) {
      return bound;
    } else if (ar[bound] > target) {
      right = bound - 1;
    } else if (ar[bound] < target) {
      left = bound + 1;
    }
  }

  return left;
};

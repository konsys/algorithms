import { searchInsertPosition } from '../searchInsertPosition/searchInsertPosition';

describe.skip('Search Insert Position', () => {
  test('должен возвращать индекс, если цель найдена', () => {
    expect(searchInsertPosition([1, 3, 5, 6], 5)).toBe(2);
    expect(searchInsertPosition([1, 3, 5, 6], 3)).toBe(1);
  });

  test('должен возвращать индекс для вставки в середину', () => {
    expect(searchInsertPosition([1, 3, 5, 6], 2)).toBe(1);
    expect(searchInsertPosition([1, 3, 5, 6], 4)).toBe(2);
  });

  test('должен возвращать индекс для вставки в начало (0)', () => {
    expect(searchInsertPosition([1, 3, 5, 6], 0)).toBe(0);
  });

  test('должен возвращать индекс для вставки в конец', () => {
    expect(searchInsertPosition([1, 3, 5, 6], 7)).toBe(4);
  });

  test('должен корректно работать с массивом из одного элемента', () => {
    expect(searchInsertPosition([1], 0)).toBe(0);
    expect(searchInsertPosition([1], 1)).toBe(0);
    expect(searchInsertPosition([1], 2)).toBe(1);
  });

  test('должен корректно работать с пустым массивом', () => {
    expect(searchInsertPosition([], 5)).toBe(0);
  });
});

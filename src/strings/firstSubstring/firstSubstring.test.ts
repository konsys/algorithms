import { strStr } from './firstSubstring';

describe('strStr function', () => {
  test('должна возвращать 0, если needle находится в начале', () => {
    expect(strStr('sadbutsad', 'sad')).toBe(0);
  });

  test('должна возвращать -1, если needle не найден', () => {
    expect(strStr('leetcode', 'leeto')).toBe(-1);
  });

  test('должна находить вхождение в середине строки', () => {
    expect(strStr('hello', 'll')).toBe(2);
  });

  test('должна возвращать 0, если needle — пустая строка', () => {
    expect(strStr('any', '')).toBe(0);
  });

  test('должна возвращать -1, если needle длиннее haystack', () => {
    expect(strStr('short', 'longerneedle')).toBe(-1);
  });
});

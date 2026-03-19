import { findSubstring } from '../substringWithConcatenation/substringWithConcatenation';

describe.skip('findSubstring', () => {
  // Тест 1: Базовый случай (Example 1)
  test('should return [0, 9] for s="barfoothefoobarman" and words=["foo","bar"]', () => {
    const s = 'barfoothefoobarman';
    const words = ['foo', 'bar'];
    expect(findSubstring(s, words).sort((a, b) => a - b)).toEqual([0, 9]);
  });

  // Тест 2: Нет совпадений (Example 2)
  test('should return [] when no concatenation exists', () => {
    const s = 'wordgoodgoodgoodbestword';
    const words = ['word', 'good', 'best', 'word'];
    expect(findSubstring(s, words)).toEqual([]);
  });

  // Тест 3: Пересекающиеся и идущие подряд подстроки (Example 3)
  test('should return [6, 9, 12] for multiple contiguous matches', () => {
    const s = 'barfoofoobarthefoobarman';
    const words = ['bar', 'foo', 'the'];
    expect(findSubstring(s, words).sort((a, b) => a - b)).toEqual([6, 9, 12]);
  });

  // Тест 4: Дубликаты в массиве words
  test('should handle duplicate words correctly', () => {
    const s = 'wordwordword';
    const words = ['word', 'word'];
    // Окно находит совпадение на 0-м индексе (0,3) и на 3-м (3,6)
    expect(findSubstring(s, words).sort((a, b) => a - b)).toEqual([0, 4]);
  });

  // Тест 5: Пустая строка или пустой массив
  test('should return [] for empty input', () => {
    expect(findSubstring('', ['foo'])).toEqual([]);
    expect(findSubstring('barfoo', [])).toEqual([]);
  });

  // Тест 6: Длина строки s меньше общей длины слов
  test('should return [] if s is shorter than total words length', () => {
    const s = 'short';
    const words = ['longer', 'string'];
    expect(findSubstring(s, words)).toEqual([]);
  });

  // Тест 7: Слова из одного символа
  test('should work with single character words', () => {
    const s = 'aaaaaaaaaaaa';
    const words = ['a', 'a', 'a'];
    // Все индексы от 0 до 9 (12 - 3)
    const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    expect(findSubstring(s, words).sort((a, b) => a - b)).toEqual(expected);
  });
});

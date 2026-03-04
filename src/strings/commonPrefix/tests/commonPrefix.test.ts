import { longestCommonPrefix } from '../commonPrefix';

describe.skip('longestCommonPrefix', () => {
  test('должен находить общий префикс в обычном массиве', () => {
    expect(longestCommonPrefix(['flower', 'flow', 'flight'])).toBe('fl');
  });

  test('должен возвращать пустую строку, если общего префикса нет', () => {
    expect(longestCommonPrefix(['dog', 'racecar', 'car'])).toBe('');
  });

  test('должен возвращать всю строку, если все строки идентичны', () => {
    expect(longestCommonPrefix(['test', 'test', 'test'])).toBe('test');
  });

  test('должен корректно работать с одной строкой в массиве', () => {
    expect(longestCommonPrefix(['alone'])).toBe('alone');
  });

  test('должен возвращать пустую строку для пустого массива', () => {
    expect(longestCommonPrefix([])).toBe('');
  });

  test('должен обрабатывать случай, когда одна строка является префиксом остальных', () => {
    expect(longestCommonPrefix(['inter', 'interview', 'internal'])).toBe('inter');
  });

  test('должен возвращать пустую строку, если одна из строк в массиве пустая', () => {
    expect(longestCommonPrefix(['', 'b', 'c'])).toBe('');
  });
});

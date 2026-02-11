import { caesarCipher } from '../caesar'; // путь к вашему файлу

describe.skip('Caesar Cipher', () => {
  test('должен корректно сдвигать на 3 (классика)', () => {
    expect(caesarCipher('ABC', 3)).toBe('DEF');
  });

  test('должен сохранять регистр букв', () => {
    expect(caesarCipher('Hello World', 5)).toBe('Mjqqt Btwqi');
  });

  test('должен циклично переходить от Z к A', () => {
    expect(caesarCipher('XYZ', 3)).toBe('ABC');
    expect(caesarCipher('xyz', 3)).toBe('abc');
  });

  test('не должен изменять знаки препинания и пробелы', () => {
    const input = 'Hello, World!';
    expect(caesarCipher(input, 10)).toBe('Rovvy, Gybvn!');
  });

  test('должен корректно работать с отрицательным сдвигом (дешифровка)', () => {
    expect(caesarCipher('DEF', -3)).toBe('ABC');
  });

  test('должен обрабатывать сдвиг больше 26 (длина алфавита)', () => {
    // Сдвиг на 27 эквивалентен сдвигу на 1
    expect(caesarCipher('A', 27)).toBe('B');
  });

  test('не должен менять текст при сдвиге 0 или 26', () => {
    expect(caesarCipher('Testing', 0)).toBe('Testing');
    expect(caesarCipher('Testing', 26)).toBe('Testing');
  });
});

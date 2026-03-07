import { letterCombinations } from '../../letter/phoneNumber/phoneNumber';

describe.skip('17. Letter Combinations of a Phone Number - Extended Tests', () => {
  // 1. КРАЕВЫЕ СЛУЧАИ (CORNER CASES)
  test('должен возвращать пустой массив при пустой строке ввода', () => {
    expect(letterCombinations('')).toEqual([]);
  });

  test('должен правильно обрабатывать одну цифру', () => {
    const result = letterCombinations('2');
    expect(result).toEqual(expect.arrayContaining(['a', 'b', 'c']));
    expect(result).toHaveLength(3);
  });

  // 2. БАЗОВЫЕ ПРИМЕРЫ ИЗ ТЕЗИСОВ
  test('должен обрабатывать "23" (стандартный пример)', () => {
    const expected = ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'];
    const result = letterCombinations('23');
    expect(result).toHaveLength(9);
    expect(result.sort()).toEqual(expected.sort());
  });

  // 3. СЛОЖНЫЕ КОМБИНАЦИИ (ЦИФРЫ С 4 БУКВАМИ)
  test('должен учитывать цифры с 4 буквами (7 и 9)', () => {
    const result = letterCombinations('7');
    expect(result).toEqual(['p', 'q', 'r', 's']);
    expect(result).toHaveLength(4);
  });

  test('смешанный вариант: 3 буквы и 4 буквы ("27")', () => {
    const result = letterCombinations('27');
    // 3 (abc) * 4 (pqrs) = 12 комбинаций
    expect(result).toHaveLength(12);
    expect(result).toContain('ap');
    expect(result).toContain('cs');
  });

  // 4. МАКСИМАЛЬНЫЙ ТЕСТ-КЕЙС (MAX CONSTRAINT)
  test('максимальная длина ввода: 4 цифры ("2345")', () => {
    const result = letterCombinations('2345');
    // Расчет: 3 * 3 * 3 * 3 = 81 комбинация
    expect(result).toHaveLength(81);
    expect(result).toContain('adgj'); // первая возможная
    expect(result).toContain('cfil'); // последняя возможная
  });

  test('максимальный объем данных: 4 цифры по 4 буквы ("7979")', () => {
    const result = letterCombinations('7979');
    // Расчет: 4 * 4 * 4 * 4 = 256 комбинаций
    expect(result).toHaveLength(256);
    expect(new Set(result).size).toBe(256); // Проверка на уникальность
    expect(result).toContain('pwpx');
  });

  // 5. ПРОВЕРКА НА ОШИБКИ (НЕОБЯЗАТЕЛЬНО, НО ПОЛЕЗНО)
  test('не должен содержать комбинаций с цифрами 0 или 1', () => {
    const result = letterCombinations('2');
    result.forEach((str) => {
      expect(str).not.toMatch(/[0-1]/);
    });
  });
});

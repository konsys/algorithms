import { countAndSay } from '../countAndSay/countAndSay';

describe.skip('Count and Say Algorithm', () => {
  test('базовый случай: n = 1', () => {
    expect(countAndSay(1)).toBe('1');
  });

  test('первые 5 элементов последовательности', () => {
    expect(countAndSay(2)).toBe('11');
    expect(countAndSay(3)).toBe('21');
    expect(countAndSay(4)).toBe('1211');
    expect(countAndSay(5)).toBe('111221');
  });

  test('сложный случай: n = 6', () => {
    // "111221" читается как: три единицы (31), две двойки (22), одна единица (11)
    expect(countAndSay(6)).toBe('312211');
  });

  test('сложный случай: n = 7', () => {
    // "312211" -> одна тройка (13), одна единица (11), две двойки (22), две единицы (21)
    expect(countAndSay(7)).toBe('13112221');
  });

  test('результат должен быть строкой', () => {
    const result = countAndSay(3);
    expect(typeof result).toBe('string');
  });

  test('обработка больших n (проверка на отсутствие зависаний)', () => {
    const result = countAndSay(10);
    expect(result.length).toBeGreaterThan(10);
  });
});

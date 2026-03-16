import { generateParenthesis } from '../generateParentesis/generatePrentesis';

describe.skip('Generate Parentheses - Полное покрытие (n от 1 до 8)', () => {
  /**
   * Количество правильных скобочных последовательностей для n пар
   * соответствует числам Каталана: C(n) = (2n)! / ((n + 1)!n!)
   */
  const catalanNumbers = {
    1: 1, // ()
    2: 2, // (()), ()()
    3: 5, // ((())), (()()), (())() ...
    4: 14,
    5: 42,
    6: 132,
    7: 429,
    8: 1430,
  };

  // Проверка всех кейсов от 1 до 8
  Object.entries(catalanNumbers).forEach(([n, expectedCount]) => {
    const num = parseInt(n);

    test(`для n = ${num} должно быть сгенерировано ${expectedCount} комбинаций`, () => {
      const result = generateParenthesis(num);

      // 1. Проверяем общее количество
      expect(result).toHaveLength(expectedCount);

      // 2. Проверяем уникальность всех комбинаций
      const uniqueResults = new Set(result);
      expect(uniqueResults.size).toBe(expectedCount);

      // 3. Проверяем валидность каждой строки (длина и баланс)
      result.forEach((str) => {
        expect(str.length).toBe(num * 2);
        expect(isValidParentheses(str)).toBe(true);
      });
    });
  });

  /**
   * Вспомогательная функция для проверки валидности скобок (Stack-based logic)
   */
  function isValidParentheses(s: string) {
    let balance = 0;
    for (let char of s) {
      if (char === '(') balance++;
      else balance--;
      if (balance < 0) return false; // Закрывающая раньше открывающей
    }
    return balance === 0;
  }

  // Отдельная проверка структуры для n = 3 (из примера в условии)
  test('структурная проверка для n = 3', () => {
    const expected = ['((()))', '(()())', '(())()', '()(())', '()()()'];
    const result = generateParenthesis(3);
    expect(result).toEqual(expect.arrayContaining(expected));
  });
});

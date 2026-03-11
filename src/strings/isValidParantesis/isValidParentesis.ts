/**
 * @file Valid Parentheses Checker
 * @summary Решение задачи LeetCode #20 с использованием стека.
 */

/**
 * Определяет, является ли входная строка валидной на основе правил вложенности скобок.
 *
 * @description
 * **Условия валидности:**
 * 1. Каждая открывающая скобка должна быть закрыта скобкой того же типа.
 * 2. Скобки должны закрываться в строгом порядке (LIFO - Last In, First Out).
 * 3. Каждая закрывающая скобка должна иметь соответствующую открывающую перед ней.
 *
 * @algorithm
 * **Использование стека (Stack):**
 * - Инициализируется пустой массив (стек) для отслеживания ожидаемых закрытий.
 * - При итерации:
 *    - Если символ является открывающей скобкой (`(`, `[`, `{`), он помещается в стек.
 *    - Если символ является закрывающим, проверяется верхний элемент стека.
 *    - Если стек пуст или тип верхней скобки не совпадает с текущей — строка невалидна.
 * - Финальный результат зависит от того, остался ли стек пустым после обхода всей строки.
 *
 * @complexity
 * **Time Complexity:** O(n), где n — длина строки (один проход).
 * **Space Complexity:** O(n), в худшем случае стек хранит все символы строки.
 *
 * @param {string} s - Входная строка, содержащая только символы `()[]{}`.
 * @returns {boolean} - true, если последовательность корректна, иначе false.
 *
 * @example
 * isValid("()"); // true
 * isValid("([)]"); // false
 */
export function isValid(s: string): boolean {
  if (s.length % 2 !== 0) {
    return false;
  }
  const map = new Map<string, string>();
  const parentesis = ['{', '}', '[', ']', '(', ')'];
  map.set('}', '{');
  map.set(')', '(');
  map.set(']', '[');
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const currentChar = s[i];
    if (!parentesis.includes(currentChar)) {
      continue;
    }
    if (map.has(currentChar)) {
      if (!stack?.length) {
        return false;
      }
      const fromStack = stack.pop();
      const fromMap = map.get(currentChar);
      if (fromStack !== fromMap) {
        return false;
      }
    } else {
      stack.push(currentChar);
    }
  }
  return Boolean(!stack?.length);
}

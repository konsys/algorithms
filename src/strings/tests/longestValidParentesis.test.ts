import { longestValidParentheses } from '../longestValidParentesis/longestValidParentesis';

describe('longestValidParentheses', () => {
  test('базовый случай: "(()"', () => {
    expect(longestValidParentheses('(()')).toBe(2);
  });

  test('несколько пар: ")()())"', () => {
    expect(longestValidParentheses(')()())')).toBe(4);
  });

  test('пустая строка', () => {
    expect(longestValidParentheses('')).toBe(0);
  });

  test('только открывающие скобки', () => {
    expect(longestValidParentheses('(((((')).toBe(0);
  });

  test('только закрывающие скобки', () => {
    expect(longestValidParentheses(')))))')).toBe(0);
  });

  test('полностью валидная строка', () => {
    expect(longestValidParentheses('()()()')).toBe(6);
  });

  test('вложенные скобки: "(())"', () => {
    expect(longestValidParentheses('(())')).toBe(4);
  });

  test('сложная комбинация: "()((())"', () => {
    expect(longestValidParentheses('()((())')).toBe(4);
  });

  test('длинная валидная цепочка после прерывания: "()(()()())"', () => {
    expect(longestValidParentheses('()(()()())')).toBe(10);
  });
});

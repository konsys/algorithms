import { factorial, fibonacci } from '../recursionLesson';

describe('Рекурсивные алгоритмы', () => {
  describe('factorial', () => {
    test('должен возвращать 1 для 0 и 1', () => {
      expect(factorial(0)).toBe(1);
      expect(factorial(1)).toBe(1);
    });

    test('должен правильно вычислять факториал положительных чисел', () => {
      expect(factorial(3)).toBe(6); // 3 * 2 * 1
      expect(factorial(5)).toBe(120); // 5 * 4 * 3 * 2 * 1
    });
  });

  describe('fibonacci', () => {
    test('должен возвращать базовые значения для 0 и 1', () => {
      expect(fibonacci(0)).toBe(0);
      expect(fibonacci(1)).toBe(1);
    });

    test('должен правильно вычислять числа последовательности', () => {
      // 0, 1, 1, 2, 3, 5, 8...
      expect(fibonacci(2)).toBe(1);
      expect(fibonacci(3)).toBe(2);
      expect(fibonacci(4)).toBe(3);
      expect(fibonacci(6)).toBe(8);
    });
  });
});

import { divide } from '../divideTwoIntegers/divideTwoIntegers';

describe('Divide Two Integers', () => {
  test('Обычное деление (положительные числа)', () => {
    expect(divide(10, 3)).toBe(3);
    expect(divide(100, 10)).toBe(10);
  });

  test('Деление с отрицательными числами', () => {
    expect(divide(7, -3)).toBe(-2);
    expect(divide(-7, 3)).toBe(-2);
    expect(divide(-10, -2)).toBe(5);
  });

  test('Деление на 1 и -1', () => {
    expect(divide(5, 1)).toBe(5);
    expect(divide(5, -1)).toBe(-5);
  });

  test('Делимое меньше делителя (результат 0)', () => {
    expect(divide(3, 10)).toBe(0);
    expect(divide(-1, 5)).toBe(0);
  });

  test('Крайние случаи (32-bit Integer Limits)', () => {
    const MAX_INT = 2147483647;
    const MIN_INT = -2147483648;

    // Случай переполнения: -2^31 / -1 должно вернуть 2^31 - 1
    expect(divide(MIN_INT, -1)).toBe(MAX_INT);

    // Минимальное число на 1
    expect(divide(MIN_INT, 1)).toBe(MIN_INT);

    // Максимальное число на 1
    expect(divide(MAX_INT, 1)).toBe(MAX_INT);
  });

  test('Большие числа (проверка скорости)', () => {
    // Если бы мы использовали вычитание по 1, этот тест бы завис
    expect(divide(2147483647, 2)).toBe(1073741823);
  });
});

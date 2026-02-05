import { ModularAlgebra } from '../modularAlgebra';

describe('Modular Properties Verification', () => {
  const n = 7n;
  const algebra = new ModularAlgebra(n);

  test('Свойство сравнения (Congruence)', () => {
    // 15 mod 7 = 1 и 1 mod 7 = 1, значит они конгруэнтны
    expect(algebra.areCongruent(15n, 1n)).toBe(true);
    expect(algebra.areCongruent(10n, 3n)).toBe(true);
  });

  test('Свойство дистрибутивности сложения', () => {
    const a = 14n;
    const b = 17n;
    // (14 + 17) mod 10 мы разбирали в примере (результат 1)
    expect(ModularAlgebra.verifyAdditionProperty(a, b, 10n)).toBe(true);
  });

  test('Свойство дистрибутивности умножения', () => {
    const a = 12n;
    const b = 15n;
    // (12 * 15) mod 7 мы разбирали в примере (результат 5)
    expect(ModularAlgebra.verifyMultiplicationProperty(a, b, 7n)).toBe(true);
  });

  test('Свойство возведения в степень (3^4 mod 7)', () => {
    // Мы разбирали, что 3^4 mod 7 можно вычислить как (3^2)^2 mod 7
    const step1 = algebra.power(3n, 2n); // 9 mod 7 = 2
    const step2 = (step1 * step1) % n; // 2 * 2 = 4

    expect(algebra.power(3n, 4n)).toBe(step2); // Должно быть 4
  });
});

describe('ModularAlgebra.multiply', () => {
  const n = 7n;
  const algebra = new ModularAlgebra(n);

  it('должен корректно умножать числа внутри модуля (3 * 4 mod 7 = 5)', () => {
    // 3 * 4 = 12; 12 % 7 = 5
    expect(algebra.multiply(3n, 4n)).toBe(5n);
  });

  it('должен возвращать 0, если один из множителей кратен модулю', () => {
    // 7 * 3 = 21; 21 % 7 = 0
    expect(algebra.multiply(7n, 3n)).toBe(0n);
  });

  it('должен подтверждать свойство: (a * b) mod n === ((a mod n) * (b mod n)) mod n', () => {
    const a = 12n; // 12 mod 7 = 5
    const b = 15n; // 15 mod 7 = 1

    const directMultiplication = algebra.multiply(a, b); // (12 * 15) mod 7 = 180 mod 7 = 5

    const preModMultiplication = algebra.multiply(a % n, b % n); // (5 * 1) mod 7 = 5

    expect(directMultiplication).toBe(preModMultiplication);
    expect(directMultiplication).toBe(5n);
  });

  it('должен корректно работать с очень большими числами (BigInt)', () => {
    const bigAlgebra = new ModularAlgebra(1000000000000000000n); // 10^18
    const a = 999999999999999999n;
    const b = 2n;
    // (a * b) выйдет за пределы стандартного Number (2^53 - 1),
    // но BigInt справится точно
    const result = bigAlgebra.multiply(a, b);
    expect(result).toBe(999999999999999998n);
  });
});

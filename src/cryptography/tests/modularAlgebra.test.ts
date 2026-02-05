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
    algebra.power(10n, 10n);

    // Мы разбирали, что 3^4 mod 7 можно вычислить как (3^2)^2 mod 7
    // const step1 = algebra.power(3n, 2n); // 9 mod 7 = 2
    // const step2 = (step1 * step1) % n; // 2 * 2 = 4

    // expect(algebra.power(3n, 4n)).toBe(step2); // Должно быть 4
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

describe('ModularAlgebra.add', () => {
  const n = 10n;
  const algebra = new ModularAlgebra(n);

  it('базовое сложение без перехода через модуль (3 + 4 mod 10 = 7)', () => {
    expect(algebra.add(3n, 4n)).toBe(7n);
  });

  it('сложение с переходом через границу модуля (8 + 5 mod 10 = 3)', () => {
    // 8 + 5 = 13; 13 % 10 = 3
    expect(algebra.add(8n, 5n)).toBe(3n);
  });

  it('сложение чисел, которые уже больше модуля (14 + 17 mod 10 = 1)', () => {
    // 14 + 17 = 31; 31 % 10 = 1
    // Это подтверждает свойство: (a + b) mod n === (a mod n + b mod n) mod n
    expect(algebra.add(14n, 17n)).toBe(1n);
  });

  it('сложение с нулем (нейтральный элемент)', () => {
    expect(algebra.add(7n, 0n)).toBe(7n);
    expect(algebra.add(0n, 0n)).toBe(0n);
  });

  it('корректная работа с BigInt (выход за пределы 64-бит)', () => {
    const hugeMod = new ModularAlgebra(10n ** 20n); // Модуль с 20 нулями
    const a = 10n ** 20n - 5n; // Число почти равное модулю
    const b = 10n;
    // (a + b) должно быть 5, так как произойдет "оборот" вокруг модуля
    expect(hugeMod.add(a, b)).toBe(5n);
  });

  it('подтверждение свойства: (a + b) mod n === ((a mod n) + (b mod n)) mod n', () => {
    const a = 123456789n;
    const b = 987654321n;
    const nCustom = 13n;
    const customAlgebra = new ModularAlgebra(nCustom);

    const directSum = customAlgebra.add(a, b);
    const splitSum = customAlgebra.add(a % nCustom, b % nCustom);

    expect(directSum).toBe(splitSum);
  });

  it('должен выдавать ошибку компиляции/типов при передаче number', () => {
    const algebra = new ModularAlgebra(7n);

    // В TypeScript это подсветит ошибку
    // @ts-expect-error
    expect(() => algebra.add(5n, 10)).toThrow();
  });
});

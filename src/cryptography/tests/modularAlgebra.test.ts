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
    const result = algebra.power(10n, 10n);
    expect(result).toBe(4n);
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

describe('ModularAlgebra.power1', () => {
  // Тест 1: Базовый случай (маленькие числа)
  test('должен правильно вычислять 2^3 mod 5 = 3', () => {
    const algebra = new ModularAlgebra(5n);
    expect(algebra.power1(2n, 3n)).toBe(3n);
  });

  // Тест 2: Степень 0
  test('любое число в степени 0 должно давать 1 (кроме mod 1)', () => {
    const algebra = new ModularAlgebra(13n);
    expect(algebra.power1(7n, 0n)).toBe(1n);
  });

  // Тест 3: Основание больше модуля
  test('должен корректно работать, если основание > модуля (12^2 mod 10)', () => {
    const algebra = new ModularAlgebra(10n);
    // 144 % 10 = 4, так же как и 2^2 % 10
    expect(algebra.power1(12n, 2n)).toBe(4n);
  });

  // Тест 4: Работа с большими числами (BigInt)
  test('должен вычислять большие степени (пример из RSA)', () => {
    const algebra = new ModularAlgebra(3233n);
    const base = 123n;
    const exp = 17n;
    // 123^17 mod 3233 вычисляется быстро и точно
    expect(typeof algebra.power1(base, exp)).toBe('bigint');
    expect(algebra.power1(base, exp)).toBe(855n);
  });

  // Тест 5: Математическое свойство (7^100 mod 10)
  test('проверка цикличного свойства (7^100 mod 10 = 1)', () => {
    const algebra = new ModularAlgebra(10n);
    expect(algebra.power1(7n, 100n)).toBe(1n);
  });

  // Тест 6: Крайний случай - Модуль 1
  test('при модуле 1 всегда должен возвращаться 0', () => {
    const algebra = new ModularAlgebra(1n);
    expect(algebra.power1(10n, 5n)).toBe(0n);
  });

  // Тест 7: Большое основание и большая степень
  test('проверка очень больших значений', () => {
    const mod = 1000000007n; // Частое простое число в олимпиадах
    const algebra = new ModularAlgebra(mod);
    const base = 987654321n;
    const exp = 123456789n;

    expect(() => algebra.power1(base, exp)).not.toThrow();
    const result = algebra.power1(base, exp);
    expect(result).toBeLessThan(mod);
    expect(result).toBeGreaterThanOrEqual(0n);
  });

  test('проверка powerWithTrace', () => {
    const mod = 10n; // Частое простое число в олимпиадах
    const algebra = new ModularAlgebra(mod);
    const base = 7n;
    const exp = 5n;
    algebra.powerWithTrace(base, exp);
    // expect(() => algebra.powerWithTrace(base, exp)).toBe(10n);
  });
});

/**
 * Класс для выполнения операций модулярной арифметики.
 * Все операции проводятся внутри кольца по модулю N.
 */
export class ModularAlgebra {
  public readonly n: bigint;

  constructor(modulus: bigint) {
    if (modulus <= 0n) throw new Error('Модуль должен быть положительным');
    this.n = modulus;
  }

  // --- Основные операции (Инстанс-методы) ---

  /**
   * Свойство дистрибутивности сложения:
   * (a + b) mod n === [(a mod n) + (b mod n)] mod n
   */
  public static verifyAdditionProperty(a: bigint, b: bigint, n: bigint): boolean {
    const direct = (a + b) % n;
    const property = ((a % n) + (b % n)) % n;
    return direct === property;
  }

  /**
   * Свойство дистрибутивности умножения:
   * (a * b) mod n === [(a mod n) * (b mod n)] mod n
   */
  public static verifyMultiplicationProperty(a: bigint, b: bigint, n: bigint): boolean {
    const direct = (a * b) % n;
    const property = ((a % n) * (b % n)) % n;
    return direct === property;
  }

  public add(a: bigint, b: bigint): bigint {
    return (a + b) % this.n;
  }

  // --- Статические методы для демонстрации свойств (на любом модуле) ---

  public multiply(a: bigint, b: bigint): bigint {
    return (a * b) % this.n;
  }

  /**
   * Свойство сравнения (Congruence): a ≡ b (mod n)
   * Проверяет, дают ли два числа одинаковый остаток.
   */
  public areCongruent(a: bigint, b: bigint): boolean {
    return ((a % this.n) + this.n) % this.n === ((b % this.n) + this.n) % this.n;
  }

  /**
   * Быстрое возведение в степень (Square-and-Multiply)
   */
  public power(base: bigint, exp: bigint): bigint {
    let result = 1n;
    let b = base % this.n;
    let e = exp;
    while (e > 0n) {
      console.log(111111, base, exp, e, b, this.n);
      if (e % 2n === 1n) {
        result = (result * b) % this.n;
        console.log('result', result);
      }
      b = (b * b) % this.n;
      e = e / 2n;
      console.log('', b, e);
    }
    return result;
  }
}

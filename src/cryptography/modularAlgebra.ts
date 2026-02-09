/**
 * Класс для выполнения операций модулярной арифметики.
 * Все операции проводятся внутри кольца по модулю N.
 */
export class ModularAlgebra {
  private readonly n: bigint;

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

  // --- Статические методы для демонстрации свойств (на любом модуле) ---

  public add(a: bigint, b: bigint): bigint {
    return (a + b) % this.n;
  }

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
      if (e % 2n === 1n) {
        result = (result * b) % this.n;
      }
      b = (b * b) % this.n;
      e = e / 2n;
    }
    return result;
  }

  /**
   * Вычисляет (base^exponent) % modulus
   * Использует алгоритм возведения в квадрат для эффективности.
   */
  power1(base: bigint, exponent: bigint): bigint {
    if (this.n === 0n) throw new Error('Модуль не может быть нулем');
    if (this.n === 1n) return 0n;

    let result = 1n;
    // Приводим основание к положительному остатку
    base = base % this.n;

    while (exponent > 0n) {
      // Если степень нечетная, умножаем результат на текущее основание
      if (exponent % 2n === 1n) {
        result = (result * base) % this.n;
      }

      // Возводим основание в квадрат и делим степень пополам
      base = (base * base) % this.n;
      exponent = exponent / 2n;
    }

    return result;
  }

  public powerWithTrace(base: bigint, exponent: bigint): bigint {
    if (this.n === 0n) throw new Error('Модуль не может быть нулем');
    if (this.n === 1n) return 0n;

    let result = 1n;

    // Исправление: (base % n + n) % n гарантирует положительный остаток
    // Например, если base = -2n, а n = 5n, то результат будет 3n.
    let b = ((base % this.n) + this.n) % this.n;
    let e = exponent;

    const logs: string[] = [`Начало: ${base}^${exponent} mod ${this.n}`];

    while (e > 0n) {
      if (e % 2n === 1n) {
        result = (result * b) % this.n;
        logs.push(`Степень нечетная (${e}): result = ${result} b = ${b}`);
      } else {
        logs.push(`Степень четная (${e}): result без изменений`);
      }

      b = (b * b) % this.n;
      e = e / 2n;
      logs.push(`  -> Новая база: ${b}, Остаток степени: ${e}`);
    }

    // Выводим все логи одной группой для Jest
    console.log(logs.join('\n'));

    return result;
  }
}

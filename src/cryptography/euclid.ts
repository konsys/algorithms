/**
 * Класс для работы с алгоритмами Евклида
 */
class Euclid {
  /**
   * Классический алгоритм Евклида: поиск Наибольшего Общего Делителя (НОД)
   * Использует итеративный подход для предотвращения переполнения стека
   */
  public static gcd(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  /**
   * Расширенный алгоритм Евклида
   * Находит x и y такие, что: a*x + b*y = gcd(a, b)
   * Возвращает объект с НОД и коэффициентами
   */
  public static extendedGcd(a: number, b: number): { gcd: number; x: number; y: number } {
    if (b === 0) {
      return { gcd: a, x: 1, y: 0 };
    }

    const { gcd, x: x1, y: y1 } = this.extendedGcd(b, a % b);

    // Вычисляем x и y на основе результатов рекурсии
    const x = y1;
    const y = x1 - Math.floor(a / b) * y1;

    return { gcd, x, y };
  }

  /**
   * Поиск обратного элемента по модулю n
   * Находит такое число x, что (a * x) % n === 1
   * Используется в RSA для генерации приватного ключа
   */
  public static modInverse(a: number, n: number): number | null {
    const { gcd, x } = this.extendedGcd(a, n);

    if (gcd !== 1) {
      // Обратного элемента не существует, если числа не взаимно просты
      return null;
    }

    // Результат x может быть отрицательным, приводим его к положительному в кольце n
    return (x % n + n) % n;
  }
}

// --- Примеры использования ---

// 1. Поиск НОД
const nod = Euclid.gcd(102, 38);
console.log(`НОД(102, 38) = ${nod}`); // Выведет: 2

// 2. Поиск обратного элемента (важно для криптографии)
// Допустим: открытая экспонента e = 7, значение функции Эйлера phi = 40
// Ищем d, такое что (7 * d) % 40 = 1
const privateKey = Euclid.modInverse(7, 40);
console.log(`Обратный элемент для 7 по модулю 40: ${privateKey}`); // Выведет: 23
// Проверка: (7 * 23) = 161. 161 % 40 = 1. Все верно!
/**
 * Функция возвращает n-й элемент последовательности "Count and Say".
 * @param n - положительное целое число
 */
export function countAndSay(n: number): string {
  // Начинаем с первого элемента последовательности
  let currentString: string = '1';

  // Нам нужно выполнить n-1 превращений (так как n=1 уже есть)
  for (let i = 1; i < n; i++) {
    let nextString: string = '';
    let count: number = 0;
    let currentChar: string = currentString[0];

    // Проходим по текущей строке и считаем символы
    for (let j = 0; j <= currentString.length; j++) {
      // Если символ совпадает с текущим — увеличиваем счетчик
      if (currentString[j] === currentChar) {
        count++;
      } else {
        // Если символ изменился (или строка закончилась):
        // 1. Добавляем количество и сам символ в новую строку
        nextString += count.toString() + currentChar;

        // 2. Сбрасываем счетчик и обновляем текущий символ
        count = 1;
        currentChar = currentString[j];
      }
    }

    // Переходим к следующей итерации с новой строкой
    currentString = nextString;
  }

  return currentString;
}

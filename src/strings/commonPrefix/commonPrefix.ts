// https://www.google.com/search?q=Write+a+function+to+find+the+longest+common+prefix+string+amongst+an+array+of+strings.%0A%0AIf+there+is+no+common+prefix%2C+return+an+empty+string+%22%22.%0A%0A+%0A%0AExample+1%3A%0A%0AInput%3A+strs+%3D+%5B%22flower%22%2C%22flow%22%2C%22flight%22%5D%0AOutput%3A+%22fl%22%0AExample+2%3A%0A%0AInput%3A+strs+%3D+%5B%22dog%22%2C%22racecar%22%2C%22car%22%5D%0AOutput%3A+%22%22%0AExplanation%3A+There+is+no+common+prefix+among+the+input+strings.&newwindow=1&sca_esv=cb0b2358a0071c17&sxsrf=ANbL-n5opCk-AVQHu02zq8CvHTSHdArg3w%3A1772519423872&source=hp&ei=_3-maaqYM6zwwPAPlZ7OkAQ&iflsig=AFdpzrgAAAAAaaaOD52zsgrZ4oLp4iw4OH309olhgkHI&aep=22&ved=0ahUKEwjqk_a0jYOTAxUsOBAIHRWPE0IQteYPCBc&oq=&gs_lp=Egdnd3Mtd2l6IgBIAFAAWABwAHgAkAEAmAEAoAEAqgEAuAEByAEAmAIAoAIAmAMAkgcAoAcAsgcAuAcAwgcAyAcAgAgA&sclient=gws-wiz&mstk=AUtExfCnLjMJxulMIUcgS3gQzHCDc7Azl69YD1soXkaf2YXvI6XRX8dqLdL2WUprWBru0htToyfQ-4go9FJEoZzLeZ9nOhGJ5iW-FpOUG5qt-eQjNy3WtaI5lQIDjNx_YgWDNLw5z8E1YvDP_7t5MDIhMj2yEmf5wbI8nXoCruNfG50b4hdTBG2yBd45zlOop3n1TtLvKCBWMpAyNmxn_stH7T-07C1zhmUv2b2rHXgmMF3sH024lEgnh6ga21gpQmWAs97yjJWo8pEosKbKmt0AAmrZDnYgkLioJf0&csuir=1&mtid=B4CmaYO3EvjiwPAPlbz2uAU&udm=50
/**
 * Алгоритм поиска самого длинного общего префикса (Вертикальное сканирование):
 *
 * 1. ПРОВЕРКА: Если массив пуст, префикса нет -> ""
 *
 * 2. ИТЕРАЦИЯ ПО СИМВОЛАМ: Берем первую строку за эталон и бежим по её индексам (i):
 *    a. Запоминаем текущий символ 'char' из первой строки на позиции 'i'.
 *
 * 3. СРАВНЕНИЕ С ОСТАЛЬНЫМИ: Для каждой следующей строки в массиве:
 *    a. ПРОВЕРКА ГРАНИЦЫ: Если текущий индекс 'i' равен длине этой строки,
 *       значит, эта строка короче эталона и префикс не может быть длиннее.
 *    b. ПРОВЕРКА СИМВОЛА: Если символ этой строки на позиции 'i' не равен 'char',
 *       значит, общее начало закончилось.
 *
 * 4. ВОЗВРАТ: Если условие (a) или (b) сработало, возвращаем часть строки от 0 до i.
 *
 * 5. ФИНАЛ: Если прошли все циклы, значит первая строка целиком — это префикс.
 */
export function longestCommonPrefix(strs: string[]): string {
  if (!strs.length) {
    return '';
  }

  if (strs.length === 1) {
    return strs[0];
  }

  for (let i = 0; i < strs[0].length; i++) {
    const char = strs[0][i];

    for (let j = 1; j < strs.length; j++) {
      if (strs[j][i] !== char) {
        return strs[0].substring(0, i);
      }
    }
  }
  return strs[0];
}

/**
 * Шифр Виженера
 * @param text - Исходный текст (латиница)
 * @param key - Ключевое слово
 * @param decrypt - Флаг дешифрования (по умолчанию false)
 */
export const vigenereCipher = (text: string, key: string, decrypt: boolean = false): string => {
  // : Удаляет из ключа всё, кроме латинских букв (цифры, пробелы, эмодзи).
  const keyUpper = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (keyUpper.length === 0) return text;

  let keyIndex = 0;
  const direction = decrypt ? -1 : 1;

  return text
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      let base: number;

      if (code >= 65 && code <= 90)
        base = 65; // A-Z
      else if (code >= 97 && code <= 122)
        base = 97; // a-z
      else return char; // Пробелы и знаки оставляем

      // Сдвиг на основе текущей буквы ключа
      const shift = keyUpper.charCodeAt(keyIndex % keyUpper.length) - 65;

      // Формула: (символ - база + (сдвиг * направление) + 26) % 26 + база
      const result = String.fromCharCode(((code - base + shift * direction + 26) % 26) + base);

      keyIndex++; // Увеличиваем индекс ключа только для букв
      return result;
    })
    .join('');
};

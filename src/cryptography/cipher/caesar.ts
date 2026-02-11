/**
 * Шифрование Цезаря для латинского алфавита
 * @param text - Исходный текст
 * @param shift - Сдвиг (может быть отрицательным)
 */
export const caesarCipher = (text: string, shift: number): string => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const ALPH_LEN = 26;
  // Нормализуем сдвиг, чтобы он всегда был от 0 до 25
  const s = ((shift % ALPH_LEN) + ALPH_LEN) % ALPH_LEN;

  return text
    .split('')
    .map((char) => {
      const lowerChar = char.toLowerCase();
      const index = alphabet.indexOf(lowerChar);

      // Если это не буква (пробел, знак), возвращаем как есть
      if (index === -1) return char;

      // Считаем новый индекс
      const newIndex = (index + s) % ALPH_LEN;
      const newChar = alphabet[newIndex];

      // Возвращаем в нужном регистре
      return char === char.toUpperCase() ? newChar.toUpperCase() : newChar;
    })
    .join('');
};

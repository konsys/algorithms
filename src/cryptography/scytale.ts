/**
 * Шифрование Сцитала
 */
export const scytaleCipher = (text: string, columns: number): string => {
  if (columns <= 1 || text.length === 0) return text;

  const rows = Math.ceil(text.length / columns);
  // Дополняем пробелами до полного прямоугольника
  const paddedText = text.padEnd(rows * columns, ' ');

  let result = '';
  for (let i = 0; i < columns; i++) {
    for (let j = i; j < paddedText.length; j += columns) {
      result += paddedText[j];
    }
  }

  return result.trimEnd();
};

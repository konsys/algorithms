import { caesarCipher } from '../caesar';

export const breakCaesarBruteForce = (text: string): string[] => {
  // Пробуем все варианты от 1 до 25
  return Array.from({ length: 25 }, (_, i) => caesarCipher(text, i + 1));
};

export const breakCaesarFrequency = (text: string): string => {
  const freqs: Record<string, number> = {};
  const lettersOnly = text.toUpperCase().replace(/[^A-Z]/g, '');

  for (const char of lettersOnly) {
    freqs[char] = (freqs[char] || 0) + 1;
  }

  // Находим самую частую букву
  const mostFrequent = Object.entries(freqs).sort((a, b) => b[1] - a[1])[0][0];

  // Предполагаем, что самая частая буква в тексте — это 'E' (код 69)
  const shift = mostFrequent.charCodeAt(0) - 69;

  return caesarCipher(text, -shift);
};

import { vigenereCipher } from '../vigenere';
import { breakVigenere } from '../crack/vigenere.brute';
import { vingenereText } from '../crack/data';

describe.skip('Вскрытие шифра Виженера', () => {
  // Вспомогательная функция для очистки текста от лишних пробелов и переносов
  const normalize = (str: string) => str.replace(/\s+/g, ' ').trim();

  test('должен автоматически определить ключ и расшифровать длинный текст', () => {
    const originalText = vingenereText.repeat(4); // Увеличили повторы для более точной статистики

    const key = 'SER';
    const encrypted = vigenereCipher(originalText, key);

    const result = breakVigenere(encrypted);

    expect(result.key).toBe('SER');
    // Сравниваем нормализованные тексты
    expect(normalize(result.decryptedText.toLowerCase())).toContain(
      normalize(vingenereText.toLowerCase().slice(0, 10))
    );
  });

  test.skip('должен возвращать исходный текст, если ключ длиной 2 символа (BA)', () => {
    // Важно: повторяем текст, чтобы статистика по каждой букве ключа (B и A) была репрезентативной
    const longText = vingenereText;
    const key = 'vi';
    const encrypted = vigenereCipher(longText, key);

    const result = breakVigenere(encrypted);

    expect(result.key).toBe('VI');
    expect(normalize(result.decryptedText)).toBe(normalize(longText));
  });

  const pseudoRandomEnglish =
    'EEETTTSSSAAAOOOIIIINNNRRRHHHLLLDDDUUUCCCMMMFFFYYYGGGPPPBKKVVXJQZZEEETTTSSSAAAOOOIIIINNNRRRHHHLLLDDDUUUCCCMMMFFFYYYGGGPPPBKKVVXJQZZ'.repeat(
      3
    );

  // Перемешаем их, но сохраним пропорции (для теста):
  const randomLetters = pseudoRandomEnglish
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

  test('Взлом на псевдослучайных буквах с ключом "KEY"', () => {
    const key = 'KEY';
    const encrypted = vigenereCipher(randomLetters, key);
    const result = breakVigenere(encrypted);

    expect(result.key).toBe('KEY');
  });
});

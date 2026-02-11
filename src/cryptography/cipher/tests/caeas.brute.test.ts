import { breakCaesarBruteForce, breakCaesarFrequency } from '../crack/caesar.brute';
import { caesarCipher } from '../caesar';

describe.skip('Вскрытие шифра Цезаря: Частотный анализ', () => {
  test('должен автоматически определить ключ на длинном тексте', () => {
    // Длинный текст на английском, зашифрованный сдвигом 5
    const encrypted = 'Ymj vznhp gwtbs ktc ozrux tajw ymj qfed itl';
    // Оригинал: 'The quick brown fox jumps over the lazy dog'

    const result = breakCaesarFrequency(encrypted);
    expect(result.toLowerCase()).toBe('the quick brown fox jumps over the lazy dog');
  });

  test('должен корректно работать с короткими словами (может быть неточным)', () => {
    // На очень коротких фразах частотный анализ может ошибаться,
    // поэтому проверяем на фразе с явным преобладанием символа.
    const input = 'EEEEEEEE'; // Зашифруем 'AAAA' сдвигом 4
    expect(breakCaesarFrequency(input)).toBe('AAAAAAA');
  });
});

describe.skip('Вскрытие шифра Цезаря: Brute Force', () => {
  const encrypted = 'KHOOR'; // "HELLO" со сдвигом 3

  test('должен генерировать все 25 вариантов расшифровки', () => {
    const results = breakCaesarBruteForce(encrypted);

    expect(results.length).toBe(25);
    expect(results).toContain('HELLO');
  });

  test('один из вариантов должен быть правильным для любого сдвига', () => {
    const original = 'I love it';
    // Зашифруем сами, чтобы точно знать, что это Цезарь
    const encrypted = caesarCipher(original, 10);

    const results = breakCaesarBruteForce(encrypted);

    // Проверяем наличие оригинала (приводим к нижнему регистру для надежности)
    const found = results.some((str) => str.toLowerCase() === original.toLowerCase());

    expect(found).toBe(true);
  });
});

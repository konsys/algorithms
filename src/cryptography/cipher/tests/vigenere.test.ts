import { vigenereCipher } from '../vigenere';

describe.skip('Vigenere Cipher', () => {
  const text = 'ATTACK AT DAWN';
  const key = 'LEMON';
  const encrypted = 'LXFOPV EF RNHR';

  test('должен корректно зашифровать классический пример', () => {
    expect(vigenereCipher(text, key)).toBe(encrypted);
  });

  test('должен корректно расшифровать при флаге decrypt: true', () => {
    expect(vigenereCipher(encrypted, key, true)).toBe(text);
  });

  test('индекс ключа не должен смещаться на пробелах и знаках', () => {
    // Если индекс смещается на пробеле, результат будет другим
    expect(vigenereCipher('A B', 'BC')).toBe('B D'); // A+B=B, B+C=D
  });

  test('должен работать с коротким ключом (цикличность ключа)', () => {
    // Ключ 'A' — это фактически шифр Цезаря со сдвигом 0
    expect(vigenereCipher('HELLO', 'A')).toBe('HELLO');
  });

  test('должен корректно обрабатывать разные регистры', () => {
    expect(vigenereCipher('Hello', 'key')).toBe('Rijvs');
  });

  test('должен игнорировать неалфавитные символы в ключе', () => {
    expect(vigenereCipher('HELLO', 'K-E-Y!')).toBe(vigenereCipher('HELLO', 'KEY'));
  });

  test('должен возвращать исходный текст, если ключ пустой или не содержит букв', () => {
    expect(vigenereCipher('HELLO', '')).toBe('HELLO');
    expect(vigenereCipher('HELLO', '123')).toBe('HELLO');
  });

  test('двойное преобразование (зашифровать-расшифровать) должно возвращать оригинал', () => {
    const original = 'TypeScript is Awesome!';
    const secretKey = 'CRIPTO';
    const encoded = vigenereCipher(original, secretKey);
    const decoded = vigenereCipher(encoded, secretKey, true);
    expect(decoded).toBe(original);
  });
});

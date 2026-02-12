import { scytaleCipher } from '../scytale';
import { breakScytale } from '../crack/scytale.break';

describe.skip('Scytale Cracker (Взломщик)', () => {
  test('должен автоматически найти ключ и расшифровать фразу', () => {
    // 1. Берем осмысленную фразу (обязательно с частыми словами типа THE)
    const secretMessage = 'THE ATTACK IS AT DAWN AND THE COFFEE IS READY';
    const originalKey = 5;

    // 2. Шифруем её
    const encrypted = scytaleCipher(secretMessage, originalKey);
    // Теперь переменная 'encrypted' выглядит как каша из букв

    // 3. Пытаемся взломать без знания ключа
    const result = breakScytale(encrypted);

    // 4. Проверяем результаты
    console.log(`Найденный ключ: ${result.key}`);
    console.log(`Результат взлома: ${result.decryptedText}`);

    expect(result.key).toBe(originalKey);
    expect(result.decryptedText.toUpperCase()).toContain('THE ATTACK IS AT DAWN');
  });

  test('должен взломать короткую фразу', () => {
    const encryptedShort = 'AA WTCADN TK TA'; // Это "ATTACK AT DAWN" с ключом 3
    const result = breakScytale(encryptedShort);

    // Даже если ключ не совпадет идеально (из-за кратности),
    // текст должен стать читаемым
    expect(result.decryptedText.replace(/\s+/g, '')).toContain('ATTACKATDAWN');
  });
});

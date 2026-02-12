import { scytaleCipher } from '../../scytale';

describe.skip('Scytale Cipher', () => {
  test('должен корректно шифровать строку (пример из учебника)', () => {
    const text = 'HELLO WORLD';
    const diameter = 3;
    // Матрица 4x3:
    // H E L
    // L O _
    // W O R
    // L D _
    // Читаем по столбцам: HLWLEOODLR
    expect(scytaleCipher(text, diameter)).toBe('HLWLEOODL R');
  });

  test('должен возвращать исходную строку при ключе 1', () => {
    expect(scytaleCipher('SECRET', 1)).toBe('SECRET');
  });

  test('должен корректно работать с короткими ключами', () => {
    // А Т
    // Т А
    // С К
    // Результат: АТС ТАК
    expect(scytaleCipher('ATTACK', 2)).toBe('ATCTAK');
  });

  test('дешифровка: двойной вызов с обратным ключом должен вернуть оригинал', () => {
    const original = 'ATTACK AT DAWN';
    const diameter = 4;

    // Зашифровали
    const encrypted = scytaleCipher(original, diameter);

    // Для дешифровки Сциталы количество столбцов меняется на количество строк
    const rows = Math.ceil(original.length / diameter);
    const decrypted = scytaleCipher(encrypted, rows);

    expect(decrypted.trim()).toBe(original);
  });

  test('должен обрабатывать пустую строку', () => {
    expect(scytaleCipher('', 5)).toBe('');
  });

  test('результат не должен содержать лишних символов, если текст короче матрицы', () => {
    const res = scytaleCipher('ABC', 10);
    expect(res).toBe('ABC');
  });
});

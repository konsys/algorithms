import { FeistelCipher } from '../feistelCipher';

describe.skip('Feistel Network Cipher', () => {
  const key = 123456;
  const cipher = new FeistelCipher(key, 16);

  test('Должен успешно расшифровать зашифрованные данные (обратимость)', () => {
    const originalL = 0x12345678;
    const originalR = 0x9abcdef0;

    const [encL, encR] = cipher.encrypt(originalL, originalR);
    const [decL, decR] = cipher.decrypt(encL, encR);

    expect(decL).toBe(originalL);
    expect(decR).toBe(originalR);
  });

  test('Шифрование должно быть детерминированным', () => {
    const L = 0xaaaaaa;
    const R = 0xbbbbbb;

    const result1 = cipher.encrypt(L, R);
    const result2 = cipher.encrypt(L, R);

    expect(result1).toEqual(result2);
  });

  test('Разные ключи должны давать разный зашифрованный текст', () => {
    const L = 0x111111;
    const R = 0x222222;
    const cipher2 = new FeistelCipher(999999, 16);

    const [encL1, encR1] = cipher.encrypt(L, R);
    const [encL2, encR2] = cipher2.encrypt(L, R);

    expect(encL1).not.toBe(encL2);
    expect(encR1).not.toBe(encR2);
  });

  test('Должен корректно работать с граничными значениями (0 и Max Unit32)', () => {
    const max32 = 0xffffffff >>> 0;
    const [encL, encR] = cipher.encrypt(0, max32);
    const [decL, decR] = cipher.decrypt(encL, encR);

    expect(decL).toBe(0);
    expect(decR).toBe(max32);
  });

  test('Лавинный эффект: изменение одного бита должно менять результат', () => {
    const L1 = 0x10000000;
    const R1 = 0x10000000;
    const L2 = 0x10000001; // Изменен только один бит
    const R2 = 0x10000000;

    const res1 = cipher.encrypt(L1, R1);
    const res2 = cipher.encrypt(L2, R2);

    expect(res1).not.toEqual(res2);
  });
});

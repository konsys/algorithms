import { otpCipher } from '../otp';

describe.skip('One-Time Pad (OTP) Cipher', () => {
  test('должен успешно расшифровать то, что зашифровал (симметричность)', () => {
    const message = 'HELLO';
    const key = 'XMCKL';

    const encrypted = otpCipher(message, key);
    const decrypted = otpCipher(encrypted, key);

    expect(decrypted).toBe(message);
  });

  test('результат шифрования не должен совпадать с оригиналом', () => {
    const message = 'SECRET';
    const key = 'ABCDEF';

    const encrypted = otpCipher(message, key);

    expect(encrypted).not.toBe(message);
    // Проверяем длину — она должна сохраниться
    expect(encrypted.length).toBe(message.length);
  });

  test('должен выбрасывать ошибку, если длина ключа не совпадает с текстом', () => {
    const message = 'SHORT';
    const key = 'LONG_KEY';

    expect(() => otpCipher(message, key)).toThrow(
      'Ключ должен быть такой же длины, как и сообщение!'
    );
  });

  test('должен корректно обрабатывать спецсимволы и пробелы', () => {
    const message = 'Top Secret 123!';
    const key = 'RandomKey!@#$%^'; // Длина должна быть 15

    const encrypted = otpCipher(message, key);
    expect(otpCipher(encrypted, key)).toBe(message);
  });

  test('повторный XOR с тем же ключом должен возвращать исходные байты (бинарная природа)', () => {
    // Используем символы, которые при XOR могут дать невидимые знаки
    const message = '\x01\x02\x03';
    const key = '\x04\x05\x06';

    const encrypted = otpCipher(message, key);
    // Результат XOR (1^4=5, 2^5=7, 3^6=5) -> "\x05\x07\x05"
    expect(encrypted).toBe('\x05\x07\x05');
    expect(otpCipher(encrypted, key)).toBe(message);
  });
});

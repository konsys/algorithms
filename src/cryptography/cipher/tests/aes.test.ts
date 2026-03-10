describe.skip('AesService', () => {
  const password = 'test-password-123';
  const message = 'Hello, Secret World!';
  let aes: AesService;

  beforeEach(() => {
    aes = new AesService(password);
  });

  test('должен успешно зашифровать и расшифровать сообщение', () => {
    const encrypted = aes.encrypt(message);
    const decrypted = aes.decrypt(encrypted);

    expect(decrypted).toBe(message);
    expect(encrypted).not.toBe(message);
    expect(encrypted.split(':')).toHaveLength(3); // iv:tag:content
  });

  test('одно и то же сообщение должно шифроваться по-разному из-за случайного IV', () => {
    const encrypted1 = aes.encrypt(message);
    const encrypted2 = aes.encrypt(message);

    expect(encrypted1).not.toBe(encrypted2);
  });

  test('должен выбросить ошибку, если данные были подменены (проверка GCM)', () => {
    const encrypted = aes.encrypt(message);
    const parts = encrypted.split(':');

    // Портим зашифрованный контент (последняя часть строки)
    parts[2] = parts[2].substring(0, 5) + '00' + parts[2].substring(7);
    const corruptedData = parts.join(':');

    expect(() => {
      aes.decrypt(corruptedData);
    }).toThrow(); // В GCM это вызовет "Unsupported state or unable to authenticate data"
  });

  test('не должен расшифровать данные с другим паролем', () => {
    const encrypted = aes.encrypt(message);
    const evilAes = new AesService('wrong-password');

    expect(() => {
      evilAes.decrypt(encrypted);
    }).toThrow();
  });
});

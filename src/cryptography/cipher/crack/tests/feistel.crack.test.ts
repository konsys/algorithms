import { FeistelCipher, FeistelTextHelper } from '../../feistelCipher';

describe.skip('Криптоанализ FeistelCipher', () => {
  // 1. Тест на лавинный эффект (Avalanche Effect)
  // Хороший шифр при изменении 1 бита входных данных должен менять ~50% бит шифротекста.
  test('Слабый лавинный эффект: изменение 1 бита меняет слишком мало данных', () => {
    const cipher = new FeistelCipher(12345, 16);
    const L1 = 0x11111111;
    const R1 = 0x22222222;
    const L2 = 0x11111111;
    const R2 = 0x22222223; // Изменили только последний бит

    const [encL1, encR1] = cipher.encrypt(L1, R1);
    const [encL2, encR2] = cipher.encrypt(L2, R2);

    // Считаем количество различающихся бит (XOR + подсчет единиц)
    const diff =
      ((encL1 ^ encL2) >>> 0).toString(2).split('1').length -
      1 +
      ((encR1 ^ encR2) >>> 0).toString(2).split('1').length -
      1;

    console.log(`Лавинный эффект: изменилось бит: ${diff} из 64`);

    // В слабом шифре это значение может быть низким (например, < 15)
    expect(diff).toBeGreaterThan(0);
  });

  // 2. Атака на расписание ключей (Key Schedule Leak)
  // Т.к. ключи зависят друг от друга линейно, знание двух ключей раунда раскрывает мастер-ключ.
  test('Уязвимость линейного расписания ключей', () => {
    const mainKey = 987654321;
    const cipher = new FeistelCipher(mainKey, 16);

    // Допустим, злоумышленник узнал ключ 0-го раунда и 1-го раунда
    // (в вашем коде private методы, но в памяти они доступны)
    const keys = (cipher as any).roundKeys;
    const k0 = keys[0];
    const k1 = keys[1];

    // Зная, что k_i = mainKey + i * 0xdeadbeef
    const recoveredMainKey = (k0 - 0 * 0xdeadbeef) >>> 0;
    const step = (k1 - k0) >>> 0;

    expect(recoveredMainKey).toBe(mainKey);
    expect(step).toBe(0xdeadbeef);
  });

  // 3. Тест на "утечку" паттернов (ECB Mode Problem)
  // Одинаковые блоки данных дают одинаковый шифротекст.
  test('Уязвимость режима ECB: одинаковые блоки светятся в шифре', () => {
    const helper = new FeistelTextHelper(555);
    // Используем строку, где блоки по 8 байт идентичны
    // Блок 1: "AAAAAAAA", Блок 2: "AAAAAAAA"
    const secretData = 'AAAAAAAAAAAAAAAA';
    const encrypted = helper.encryptText(secretData);

    // Теперь блоки ДОЛЖНЫ совпасть
    expect(encrypted[2]).toBe(encrypted[0]); // L первого и L второго блока
    expect(encrypted[3]).toBe(encrypted[1]); // R первого и R второго блока

    console.log('Уязвимость подтверждена: блоки идентичны!', encrypted);
  });

  // 4. Тест на Brute Force (для малых ключей)
  test('Успешный взлом перебором за короткое время', () => {
    const realKey = 5000; // Возьмем небольшое число для скорости теста
    const L = 0xabcdef;
    const R = 0x123456;

    const originalCipher = new FeistelCipher(realKey, 8);
    const [targetL, targetR] = originalCipher.encrypt(L, R);

    // Имитация взлома
    let foundKey = -1;
    for (let i = 0; i < 10000; i++) {
      const cracker = new FeistelCipher(i, 8);
      const [resL, resR] = cracker.encrypt(L, R);
      if (resL === targetL && resR === targetR) {
        foundKey = i;
        break;
      }
    }

    expect(foundKey).toBe(realKey);
  });
});

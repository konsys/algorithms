import { SPNetwork } from '../spNetwork';

describe('SPNetwork', () => {
  const key = 0x1234;
  const spn = new SPNetwork(key);

  test('S-Box должен быть обратимым (подстановка и инверсия)', () => {
    const input = 0x5;

    // Передаем саму таблицу sBox вторым аргументом
    const substituted = spn['substitute'](input, spn['sBox']);

    // Передаем таблицу invSBox для обратного преобразования
    const inverted = spn['substitute'](substituted, spn['invSBox']);

    expect(inverted).toBe(input);
    expect(substituted).not.toBe(input);
  });

  test.skip('P-Box (перестановка) должен сохранять количество единичных бит', () => {
    const input = 0xabcd; // 1010 1011 1100 1101
    const permuted = spn['permute'](input);

    // Вспомогательная функция для подсчета единиц
    const countOnes = (n: number) => n.toString(2).split('1').length - 1;

    expect(countOnes(permuted)).toBe(countOnes(input));
  });

  test.skip('Полный цикл: зашифрование и расшифрование блока', () => {
    const data = 0xcafe;
    const encrypted = spn.encrypt(data);
    const decrypted = spn.decrypt(encrypted);

    expect(decrypted).toBe(data);
    0;
  });

  test.skip('Изменение одного бита ключа должно полностью менять результат', () => {
    //  698 977
    const data = 0xaaaa1;
    const spn1 = new SPNetwork(0x1234);
    const spn2 = new SPNetwork(0x1235); // Разница в 1 бит

    const res1 = spn1.encrypt(data);
    const res2 = spn2.encrypt(data);

    expect(res1).not.toBe(res2);
  });
});

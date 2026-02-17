export class SPNetwork {
  private key: number;

  // Пример S-Box (замена 4-битных значений)
  private sBox: number[] = [
    0xe, 0x4, 0xd, 0x1, 0x2, 0xf, 0xb, 0x8, 0x3, 0xa, 0x6, 0xc, 0x5, 0x9, 0x0, 0x7,
  ];
  // Инвертированный S-Box для дешифрования
  private invSBox: number[] = new Array(16);

  constructor(key: number) {
    // Добавляем аргумент здесь!
    this.key = key >>> 0;

    // Автоматически создаем таблицу для расшифровки
    for (let i = 0; i < this.sBox.length; i++) {
      this.invSBox[this.sBox[i]] = i;
    }
  }

  public encrypt(data: number): number {
    let state = (data ^ this.key) >>> 0;
    return this.substitute(state, this.sBox);
  }

  public decrypt(cipherText: number): number {
    let state = this.substitute(cipherText, this.invSBox);
    return (state ^ this.key) >>> 0;
  }

  // Внутри класса SPNetwork
  private permute(block: number): number {
    // Пример циклического сдвига и перестановки битов (для 16-битного блока)
    // Мы меняем местами четные и нечетные биты
    const evenBits = (block & 0xaaaa) >>> 1;
    const oddBits = (block & 0x5555) << 1;
    return (evenBits | oddBits) >>> 0;
  }

  // Пример простейшей подстановки (S-слой)
  private substitute(block: number, box: number[]): number {
    let result = 0;
    for (let i = 0; i < 4; i++) {
      const nibble = (block >> (i * 4)) & 0xf;
      result |= box[nibble] << (i * 4);
    }
    return result >>> 0;
  }
}

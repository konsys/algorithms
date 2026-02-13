/**
 * Реализация простой Сети Фейстеля на TypeScript.
 * Этот пример учебный и не предназначен для реальной защиты данных.
 */

export class FeistelCipher {
  private rounds: number;
  private roundKeys: number[];

  constructor(mainKey: number, rounds: number = 8) {
    this.rounds = rounds;
    this.roundKeys = this.generateRoundKeys(mainKey);
  }

  public encrypt(left: number, right: number): [number, number] {
    return this.process(left, right, this.roundKeys);
  }

  public decrypt(left: number, right: number): [number, number] {
    // Для дешифрования используем те же ключи, но в обратном порядке
    const reversedKeys = [...this.roundKeys].reverse();
    return this.process(left, right, reversedKeys);
  }

  /**
   * Генерация ключей для каждого раунда (Key Schedule).
   * В реальных шифрах (как DES) это сложный процесс.
   */
  private generateRoundKeys(mainKey: number): number[] {
    const keys: number[] = [];
    for (let i = 0; i < this.rounds; i++) {
      // Простейшая генерация: каждый ключ раунда — производное от основного
      keys.push((mainKey + i * 0xdeadbeef) >>> 0);
    }
    return keys;
  }

  /**
   * Функция раунда (F-function).
   * Она не обязана быть обратимой. Здесь используем XOR и битовые сдвиги.
   */
  private roundFunction(rightHalf: number, key: number): number {
    // Простое запутывание данных
    let hash = (rightHalf ^ key) >>> 0;
    hash = ((hash << 5) | (hash >>> 27)) >>> 0; // Циклический сдвиг
    return hash;
  }

  /**
   * Процесс шифрования/дешифрования.
   * Отличается только порядком ключей раунда.
   */
  private process(left: number, right: number, keys: number[]): [number, number] {
    let L = left;
    let R = right;

    for (const key of keys) {
      const nextR = (L ^ this.roundFunction(R, key)) >>> 0;
      const nextL = R; // Старая правая часть становится новой левой

      L = nextL;
      R = nextR;
    }

    // В последнем раунде обычно не делают финальную перестановку половин,
    // но для симметричности алгоритма возвращаем их в порядке [R, L]
    return [R, L];
  }
}

export class FeistelTextHelper {
  private cipher: FeistelCipher;

  constructor(key: number) {
    this.cipher = new FeistelCipher(key, 16);
  }

  public encryptText(text: string): Uint32Array {
    // 1. Превращаем текст в массив байт (UTF-8)
    const encoder = new TextEncoder();
    let bytes = Array.from(encoder.encode(text));

    // 2. Padding: дополняем до кратности 8 байтам (2 числа по 4 байта)
    while (bytes.length % 8 !== 0) {
      bytes.push(0);
    }

    // 3. Шифруем блоками по 8 байт
    const result = new Uint32Array(bytes.length / 4);
    for (let i = 0; i < bytes.length; i += 8) {
      // Собираем два 32-битных числа из байт
      const L = this.bytesToUint32(bytes.slice(i, i + 4));
      const R = this.bytesToUint32(bytes.slice(i + 4, i + 8));

      const [encL, encR] = this.cipher.encrypt(L, R);

      result[i / 4] = encL;
      result[i / 4 + 1] = encR;
    }
    return result;
  }

  private bytesToUint32(b: number[]): number {
    return ((b[0] << 24) | (b[1] << 16) | (b[2] << 8) | b[3]) >>> 0;
  }
}

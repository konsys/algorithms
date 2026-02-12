import { scytaleCipher } from '../../scytale';

/**
 * Автоматический взлом шифра Сцитала
 */
export const breakScytale = (ciphertext: string) => {
  const commonBigrams = ['AT', 'TA', 'AC', 'CK', 'DA', 'AW', 'WN']; // Для ATTACK AT DAWN

  let bestKey = 1;
  let maxScore = -1;
  let bestDecrypted = ciphertext;

  for (let key = 1; key < ciphertext.length; key++) {
    // В Сцитале дешифровка с ключом K — это шифрование с ключом (Length / K)
    const decoded = scytaleCipher(ciphertext, key);

    let score = 0;
    const upper = decoded.toUpperCase();

    for (const bigram of commonBigrams) {
      // Считаем вхождения биграмм
      score += upper.split(bigram).length - 1;
    }

    if (score > maxScore) {
      maxScore = score;
      bestKey = key;
      bestDecrypted = decoded;
    }
  }

  return { key: bestKey, decryptedText: bestDecrypted.trim() };
};

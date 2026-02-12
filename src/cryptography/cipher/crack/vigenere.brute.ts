import { vigenereCipher } from '../vigenere';

/**
 * Автоматический взлом шифра Виженера (Криптоанализ)
 */
export const breakVigenere = (ciphertext: string) => {
  const cleanText = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
  if (cleanText.length < 10) return { key: '', decryptedText: ciphertext };

  // 1. ОПРЕДЕЛЕНИЕ ДЛИНЫ КЛЮЧА
  // Мы ищем ПЕРВУЮ длину, которая дает Индекс Совпадения (IC) близкий к английскому (0.066)
  let bestKeyLength = 1;
  const targetIC = 0.065; // Эталон для английского
  const ics: number[] = [];
  const maxTestLength = 20;
  for (let len = 1; len <= maxTestLength; len++) {
    const ic = calculateAverageIC(cleanText, len);
    ics[len] = ic;
  }

  // Находим минимальную длину, чей IC составляет хотя бы 80% от максимального найденного
  // Это предотвращает выбор кратных длин (например, 20 вместо 2)
  const maxFoundIC = Math.max(...ics.filter((n) => n !== undefined));
  for (let len = 1; len <= maxTestLength; len++) {
    if (ics[len] > maxFoundIC * 0.9) {
      bestKeyLength = len;
      break;
    }
  }

  // 2. ОПРЕДЕЛЕНИЕ СИМВОЛОВ КЛЮЧА (Частотный анализ Хи-квадрат)
  let foundKey = '';
  for (let i = 0; i < bestKeyLength; i++) {
    let sequence = '';
    for (let j = i; j < cleanText.length; j += bestKeyLength) {
      sequence += cleanText[j];
    }
    foundKey += solveCaesarByChiSquare(sequence);
  }

  // 3. ДЕШИФРОВКА
  return {
    key: foundKey,
    decryptedText: vigenereCipher(ciphertext, foundKey, true),
  };
};

/**
 * Расчет среднего Индекса Совпадения для групп текста
 */
function calculateAverageIC(text: string, keyLength: number): number {
  let totalIC = 0;
  for (let i = 0; i < keyLength; i++) {
    let subseq = '';
    for (let j = i; j < text.length; j += keyLength) subseq += text[j];

    if (subseq.length <= 1) continue;

    const counts: Record<string, number> = {};
    for (const char of subseq) {
      counts[char] = (counts[char] || 0) + 1;
    }

    // console.log(subseq);
    let sum = 0;
    for (const count of Object.values(counts)) {
      sum += count * (count - 1);
    }
    totalIC += sum / (subseq.length * (subseq.length - 1));
    console.log(totalIC / keyLength, i);
  }

  return totalIC / keyLength;
}

/**
 * Взлом одной позиции ключа (Шифр Цезаря) методом Хи-квадрат
 */
function solveCaesarByChiSquare(sequence: string): string {
  // Эталонные частоты букв английского языка (от A до Z)
  // 0.0817 = 8.17% для буквы A, 0.0149 = 1.49% для B и так далее.
  const englishFreqs = [
    0.0817, 0.0149, 0.0278, 0.0425, 0.127, 0.0223, 0.0202, 0.0609, 0.0697, 0.0015, 0.0077, 0.0403,
    0.0241, 0.0675, 0.0751, 0.0193, 0.001, 0.0599, 0.0633, 0.0906, 0.0276, 0.0098, 0.0236, 0.0015,
    0.0197, 0.0007,
  ];

  let bestShift = 0; // Переменная для хранения лучшего сдвига (0-25)
  let minChi2 = Infinity; // Сюда запишем минимальный "штраф" (чем меньше, тем лучше)

  // Перебираем все 26 возможных вариантов сдвига (ключей Цезаря)
  for (let shift = 0; shift < 26; shift++) {
    const observedCounts = new Array(26).fill(0); // Массив для подсчета реально встреченных букв

    // Для каждой буквы в нашей порции текста...
    for (const char of sequence) {
      // "Откатываем" букву назад на проверяемый сдвиг, чтобы узнать, какой она могла быть
      // 65 — это ASCII код буквы 'A'
      const decodedIdx = (char.charCodeAt(0) - 65 - shift + 26) % 26;
      observedCounts[decodedIdx]++; // Увеличиваем счетчик этой буквы
    }

    let chi2 = 0; // Начинаем расчет суммы отклонений для текущего сдвига

    // Сравниваем полученную статистику букв с эталонной английской
    for (let i = 0; i < 26; i++) {
      // Сколько раз буква должна была встретиться в тексте такой длины в идеале
      const expected = sequence.length * englishFreqs[i];

      if (expected > 0) {
        // Формула Хи-квадрат: (Реальность - Ожидание)^2 / Ожидание
        // Она показывает, насколько сильно наш текст "косит" под нормальный английский
        chi2 += Math.pow(observedCounts[i] - expected, 2) / expected;
      }
    }

    // Если этот сдвиг дал результат "естественнее", чем все предыдущие...
    if (chi2 < minChi2) {
      minChi2 = chi2; // Запоминаем новый рекорд минимума
      bestShift = shift; // Запоминаем, что этот сдвиг — наш главный кандидат
    }
  }

  // Превращаем число сдвига обратно в букву (0 -> 'A', 1 -> 'B' и т.д.)
  // Это и будет один символ из искомого ключа Виженера
  return String.fromCharCode(65 + bestShift);
}

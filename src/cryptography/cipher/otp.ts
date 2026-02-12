/**
 * Шифрование и дешифрование One-Time Pad (симметрично)
 */
export const otpCipher = (text: string, key: string): string => {
  if (text.length !== key.length) {
    throw new Error('Ключ должен быть такой же длины, как и сообщение!');
  }

  let result = '';
  for (let i = 0; i < text.length; i++) {
    // Операция XOR на уровне кодов символов
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i);
    result += String.fromCharCode(charCode);
  }
  return result;
};

// --- Пример использования ---
const message = 'HELLO';
const randomKey = 'XMCKL'; // Представим, что это абсолютно случайный ключ

const encrypted = otpCipher(message, randomKey);
console.log('Зашифровано:', encrypted); // Будет выглядеть как странные символы (белый шум)

const decrypted = otpCipher(encrypted, randomKey);
console.log('Расшифровано:', decrypted); // Снова "HELLO"
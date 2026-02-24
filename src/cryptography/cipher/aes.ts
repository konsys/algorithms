import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

interface EncryptedData {
  iv: string;
  content: string;
  tag: string;
}

class AesService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly key: Buffer;

  constructor(encryptionKey: string) {
    // AES-256 требует ключ ровно 32 байта.
    // Используем хеширование, чтобы превратить любой пароль в ключ нужной длины.
    this.key = Buffer.alloc(32, encryptionKey, 'utf-8');
  }

  /** Шифрование */
  public encrypt(text: string): EncryptedData {
    const iv = randomBytes(12); // Вектор инициализации
    const cipher = createCipheriv(this.algorithm, this.key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
      iv: iv.toString('hex'),
      content: encrypted,
      tag: cipher.getAuthTag().toString('hex'),
    };
  }

  /** Расшифровка */
  public decrypt(data: EncryptedData): string {
    const decipher = createDecipheriv(this.algorithm, this.key, Buffer.from(data.iv, 'hex'));

    decipher.setAuthTag(Buffer.from(data.tag, 'hex'));

    let decrypted = decipher.update(data.content, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}

// --- Использование ---
const aes = new AesService('my-secret-key-123');

const secretMessage = 'Купи молоко и сохрани мир';
const encrypted = aes.encrypt(secretMessage);

console.log('Зашифровано:', encrypted.content);

const original = aes.decrypt(encrypted);
console.log('Расшифровано:', original);

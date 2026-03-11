import { isValid } from '../isValidParantesis/isValidParentesis';

describe.skip('Valid Parentheses - All Edge Cases', () => {
  test('should validate basic, nested, and edge cases', () => {
    // 1. Положительные (True)
    expect(isValid('()')).toBe(true); // Базовый
    expect(isValid('()[]{}')).toBe(true); // Последовательный
    expect(isValid('{[()]}')).toBe(true); // Вложенный
    expect(isValid('')).toBe(true); // Пустая строка (опционально)

    // 2. Неверный порядок или тип (False)
    expect(isValid('(]')).toBe(false); // Разные типы
    expect(isValid('([)]')).toBe(false); // Нахлест (пересечение)
    expect(isValid(']')).toBe(false); // Только закрывающая

    // 3. Проблемы с длиной и стеком (False)
    expect(isValid('(')).toBe(false); // Одиночный открывающий
    expect(isValid(')')).toBe(false); // Одиночный закрывающий
    expect(isValid('(((')).toBe(false); // Недобор закрывающих
    expect(isValid(')))')).toBe(false); // Избыток закрывающих
    expect(isValid('(()')).toBe(false); // Нечетная длина
    expect(isValid('()(')).toBe(false); // Лишний в конце

    // 4. Сложные структуры
    const longValid = '('.repeat(100) + '[]'.repeat(50) + ')'.repeat(100);
    expect(isValid(longValid)).toBe(true); // Длинная валидная строка

    const longInvalid = '('.repeat(100) + ']' + ')'.repeat(100);
    expect(isValid(longInvalid)).toBe(false); // Ошибка в глубине стека
  });
});

import { deepClone, factorial, fibonacci } from '../recursionLesson';
import { quickSort } from '../../tasks/resursion';

describe.skip('Рекурсивные алгоритмы', () => {
  describe.skip('factorial', () => {
    test('должен возвращать 1 для 0 и 1', () => {
      expect(factorial(0)).toBe(1);
      expect(factorial(1)).toBe(1);
    });

    test('должен правильно вычислять факториал положительных чисел', () => {
      expect(factorial(3)).toBe(6); // 3 * 2 * 1
      expect(factorial(5)).toBe(120); // 5 * 4 * 3 * 2 * 1
    });
  });

  describe.skip('fibonacci', () => {
    test('должен возвращать базовые значения для 0 и 1', () => {
      expect(fibonacci(0)).toBe(0);
      expect(fibonacci(1)).toBe(1);
    });

    test('должен правильно вычислять числа последовательности', () => {
      // 0, 1, 1, 2, 3, 5, 8...
      expect(fibonacci(2)).toBe(1);
      expect(fibonacci(3)).toBe(2);
      expect(fibonacci(4)).toBe(3);
      expect(fibonacci(6)).toBe(8);
    });
  });
});

describe.skip('quickSort', () => {
  test('сортирует обычный массив чисел', () => {
    const input = [5, 3, 8, 1, 2];
    const expected = [1, 2, 3, 5, 8];
    expect(quickSort(input)).toEqual(expected);
  });

  test('обрабатывает пустой массив', () => {
    expect(quickSort([])).toEqual([]);
  });

  test('обрабатывает массив из одного элемента', () => {
    expect(quickSort([42])).toEqual([42]);
  });

  test('сортирует массив с дубликатами', () => {
    const input = [3, 1, 2, 3, 1];
    const expected = [1, 1, 2, 3, 3];
    expect(quickSort(input)).toEqual(expected);
  });

  test('сортирует уже отсортированный массив', () => {
    const input = [1, 2, 3, 4, 5];
    expect(quickSort(input)).toEqual([1, 2, 3, 4, 5]);
  });

  test('сортирует массив, отсортированный в обратном порядке', () => {
    const input = [5, 4, 3, 2, 1];
    expect(quickSort(input)).toEqual([1, 2, 3, 4, 5]);
  });

  test('обрабатывает отрицательные числа', () => {
    const input = [0, -5, 2, -1, 10];
    const expected = [-5, -1, 0, 2, 10];
    expect(quickSort(input)).toEqual(expected);
  });
});

describe.skip('deepClone', () => {
  test('должен создавать идентичную копию плоского объекта', () => {
    const obj = { a: 1, b: 'test' };
    const copy = deepClone(obj);

    expect(copy).toEqual(obj); // Значения равны
    expect(copy).not.toBe(obj); // Ссылки разные
  });

  test('должен выполнять глубокое копирование вложенных структур', () => {
    const original = {
      user: { name: 'Ivan', tags: ['admin', 'dev'] },
      active: true,
    };

    const copy = deepClone(original);

    // Изменяем копию
    copy.user.name = 'Oleg';
    copy.user.tags.push('new');

    // Оригинал должен остаться нетронутым
    expect(original.user.name).toBe('Ivan');
    expect(original.user.tags).toHaveLength(2);
    expect(copy.user.name).toBe('Oleg');
  });

  test('должен корректно копировать массивы', () => {
    const list = [1, [2, 3], { x: 10 }];
    const copy = deepClone(list);

    expect(Array.isArray(copy)).toBe(true);
    expect(copy[1]).not.toBe(list[1]); // Вложенный массив — новая ссылка
    expect(copy).toEqual(list);
  });

  test('должен возвращать примитивы как есть', () => {
    expect(deepClone(42)).toBe(42);
    expect(deepClone('hello')).toBe('hello');
    expect(deepClone(null)).toBe(null);
  });

  // Тест на граничный случай (если не реализована обработка циклов, этот тест упадет)
  test.skip('должен обрабатывать циклические ссылки', () => {
    const obj: any = { name: 'Loop' };
    obj.self = obj;

    const copy = deepClone(obj);
    expect(copy.self).toBe(copy);
  });
});

import { threeSumClosest } from '../3sumClosest/3SumClosest';

describe.skip('3Sum Closest - Corner Cases', () => {
  test('Минимально допустимый массив (ровно 3 элемента)', () => {
    // По условию n >= 3, это самый нижний порог
    expect(threeSumClosest([1, 2, 3], 10)).toBe(6);
    expect(threeSumClosest([-1, -2, -3], 0)).toBe(-6);
  });

  test('Массив из одинаковых чисел', () => {
    // Все тройки дают одну и ту же сумму
    expect(threeSumClosest([5, 5, 5, 5, 5], 10)).toBe(15);
    expect(threeSumClosest([0, 0, 0, 0], 0)).toBe(0);
  });

  test('Выбор между двумя далекими суммами', () => {
    // Суммы: 1+2+3=6 и 10+20+30=60
    const nums = [1, 2, 3, 10, 20, 30];

    expect(threeSumClosest(nums, 10)).toBe(13);

    // Target 50 ближе к 60 (дистанция 10), чем к 33 (дистанция 17)
    expect(threeSumClosest(nums, 50)).toBe(51);
  });

  test('Отрицательный target и отрицательные числа', () => {
    expect(threeSumClosest([-10, -5, -2, 0], -15)).toBe(-15); // -10-5
  });

  test('Большие разбросы значений (Overflow/Precision check)', () => {
    const nums = [1000, -1000, 500, -500, 1];
    const target = 2;
    // Ближайшая сумма: 500 + (-500) + 1 = 1
    expect(threeSumClosest(nums, target)).toBe(1);
  });

  test('Массив с дубликатами, где решение состоит из дублей', () => {
    // Суммы могут быть 2+2+2=6, 2+2+1=5, 2+1+1=4
    expect(threeSumClosest([2, 2, 2, 1, 1], 4)).toBe(4);
  });

  test('Target равен нулю при наличии разнонаправленных чисел', () => {
    expect(threeSumClosest([-3, -1, 1, 2], 0)).toBe(0); // -3 + 1 + 2 = 0
  });

  test('Target очень большой или очень маленький', () => {
    const nums = [1, 2, 3];
    expect(threeSumClosest(nums, 1000000)).toBe(6);
    expect(threeSumClosest(nums, -1000000)).toBe(6);
  });
});

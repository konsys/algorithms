import { ackermannIterative, hanoi } from '../recursionLesson';

describe('hanoi', () => {
  test('должен hanoi', () => {
    hanoi(3, 'A', 'C', 'B');
  });
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    // Шпионим за консолью и подавляем реальный вывод во время тестов
    logSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  test('для 0 дисков ничего не происходит', () => {
    hanoi(0, 'A', 'C', 'B');
    expect(logSpy).not.toHaveBeenCalled();
  });

  test('для 1 диска выполняется ровно 1 перемещение', () => {
    hanoi(1, 'A', 'C', 'B');
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('Переместить диск 1 с A на C');
  });

  test('для 3 дисков выполняется 7 перемещений (2^n - 1)', () => {
    hanoi(3, 'A', 'C', 'B');
    expect(logSpy).toHaveBeenCalledTimes(7);

    // Проверка последовательности первых двух шагов
    expect(logSpy.mock.calls[0][0]).toBe('Переместить диск 1 с A на C');
    expect(logSpy.mock.calls[1][0]).toBe('Переместить диск 2 с A на B');
    expect(logSpy.mock.calls[2][0]).toBe('Переместить диск 1 с C на B');
    expect(logSpy.mock.calls[3][0]).toBe('Переместить диск 3 с A на C');
    expect(logSpy.mock.calls[4][0]).toBe('Переместить диск 1 с B на A');
    expect(logSpy.mock.calls[5][0]).toBe('Переместить диск 2 с B на C');
    expect(logSpy.mock.calls[6][0]).toBe('Переместить диск 1 с A на C');
  });

  test('правильный порядок последнего хода для 2 дисков', () => {
    hanoi(2, 'A', 'C', 'B');
    // Последний ход всегда перемещает диск 1 на целевой стержень
    const lastCallIndex = logSpy.mock.calls.length - 1;
    expect(logSpy.mock.calls[lastCallIndex][0]).toBe('Переместить диск 1 с B на C');
  });

  test('ackermannIterative', () => {
    console.log(11111111111);
    console.log(ackermannIterative(2, 4));
  });
});

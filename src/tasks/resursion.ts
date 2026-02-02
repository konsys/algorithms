// Типизация рекурсивного дерева
type Category = {
  name: string;
  children?: Category[]; // Свойство ссылается на сам тип Category
};

// Рекурсивная функция вычисления факториала с типами
function factorial(n: number): number {
  if (n <= 1) return 1; // База рекурсии
  return n * factorial(n - 1); // Рекурсивный шаг
}

const fibonacci = (n: number): number => {
  // База рекурсии: первые два числа последовательности
  if (n <= 1) {
    return n;
  }

  // Рекурсивный шаг: сумма двух предыдущих чисел
  // Здесь TS тоже требует явного указания :number, так как функция вызывает себя
  return fibonacci(n - 1) + fibonacci(n - 2);
};

const hanoi = (n: number, from: string, to: string, aux: string): void => {
  if (n === 0) return; // Базовый случай: дисков нет

  // 1. Перемещаем n-1 диск на вспомогательный стержень
  hanoi(n - 1, from, aux, to);

  // 2. Перемещаем оставшийся самый большой диск
  console.log(`Переместить диск ${n} с ${from} на ${to}`);

  // 3. Перемещаем n-1 диск со вспомогательного на целевой
  hanoi(n - 1, aux, to, from);
};

type Tower = number[];
type State = [Tower, Tower, Tower];

const render = (state: State, total: number) => {
  console.clear();
  const names = ['  A  ', '  B  ', '  C  '];
  let output = '\n';

  for (let level = total - 1; level >= 0; level--) {
    let line = '';
    for (const tower of state) {
      const diskSize = tower[level] || 0;
      if (diskSize > 0) {
        // Рисуем диск: пробелы + символы '=' + пробелы
        const pad = ' '.repeat(total - diskSize);
        const disk = '='.repeat(diskSize * 2 - 1);
        line += `${pad}[${disk}]${pad} `;
      } else {
        // Рисуем пустой стержень
        const pad = ' '.repeat(total);
        line += `${pad}|${pad} `;
      }
    }
    output += line + '\n';
  }

  output += names.map((n) => ' '.repeat(total - 2) + n + ' '.repeat(total - 2)).join(' ');
  console.log(output + '\n');
};

export const solveHanoi = async (n: number) => {
  const state: State = [
    Array.from({ length: n }, (_, i) => n - i), // Стержень A: [3, 2, 1]
    [], // B
    [], // C
  ];

  const move = async (count: number, from: number, to: number, aux: number) => {
    if (count > 0) {
      await move(count - 1, from, aux, to);

      // Логика перемещения
      const disk = state[from].pop()!;
      state[to].push(disk);

      render(state, n);
      await new Promise((resolve) => setTimeout(resolve, 800)); // Пауза для анимации

      await move(count - 1, aux, to, from);
    }
  };

  render(state, n);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await move(n, 0, 2, 1);
  console.log('Готово!');
};

export const quickSort = (arr: number[]): number[] => {
  // Базовый случай: массив из 0 или 1 элемента уже отсортирован
  if (arr.length <= 1) {
    return arr;
  }

  // Выбираем опорный элемент (пусть будет средний)
  const pivot = arr[Math.floor(arr.length / 2)];

  // Распределяем элементы по группам
  const left = arr.filter((x) => x < pivot);
  const middle = arr.filter((x) => x === pivot);
  const right = arr.filter((x) => x > pivot);

  // Рекурсивно сортируем лево и право, затем склеиваем
  return [...quickSort(left), ...middle, ...quickSort(right)];
};

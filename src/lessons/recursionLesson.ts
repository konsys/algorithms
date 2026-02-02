export const factorial = (n: number): number => {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
};

export const fibonacci = (n: number): number => {
  if (n <= 1) {
    return n;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
};

export const hanoi = (n: number, from: string, to: string, aux: string): void => {
  if (n === 0) {
    return;
  }

  hanoi(n - 1, from, aux, to);

  console.log(`Переместить диск ${n} с ${from} на ${to}`);

  hanoi(n - 1, aux, to, from);
};

export const ackermannIterative = (m: number, n: number): number => {
  const stack: number[] = [m];

  while (stack.length > 0) {
    m = stack.pop()!;

    if (m === 0) {
      n = n + 1;
    } else if (n === 0) {
      stack.push(m - 1);
      n = 1;
    } else {
      // Имитируем вызов: ackermann(m - 1, ackermann(m, n - 1))
      stack.push(m - 1);
      stack.push(m);
      n = n - 1;
    }
  }

  return n;
};

export const quickSort = (arr: number[]): number[] => {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)];

  const left = arr.filter((x) => x < pivot);
  const middle = arr.filter((x) => x === pivot);
  const right = arr.filter((x) => x > pivot);

  return [...quickSort(left), ...middle, ...quickSort(right)];
};

export const deepCopyClone = () => {
  const original = {
    id: 1,
    metadata: { date: new Date(), tags: ['ts', 'js'] },
  };

  // Глубокое копирование одной строкой
  const deepCopy = structuredClone(original);

  deepCopy.metadata.tags.push('recursion');
  console.log(original.metadata.tags); // ['ts', 'js'] — оригинал не изменился
};

export function deepClone<T>(obj: T): T {
  // Базовый случай: если это не объект или null, возвращаем как есть
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Обработка массивов
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as any;
  }

  // Создаем новый объект и рекурсивно копируем свойства
  const clonedObj = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }

  return clonedObj;
}

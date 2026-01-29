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

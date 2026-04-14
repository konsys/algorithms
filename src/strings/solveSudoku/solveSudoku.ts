export function solveSudoku(board: string[][]): void {
  const isValid = (r: number, c: number, char: string): boolean => {
    for (let i = 0; i < 9; i++) {
      // Проверка строки
      if (board[r][i] === char) return false;
      // Проверка столбца
      if (board[i][c] === char) return false;

      // Проверка квадрата 3x3
      // Вычисляем координаты внутри малого квадрата
      const rowInBox = 3 * Math.floor(r / 3) + Math.floor(i / 3);
      const colInBox = 3 * Math.floor(c / 3) + (i % 3);

      if (board[rowInBox][colInBox] === char) return false;
    }
    return true;
  };

  const backtrack = (): boolean => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === '.') {
          for (let num = 1; num <= 9; num++) {
            const char = num.toString();

            if (isValid(r, c, char)) {
              board[r][c] = char; // Пробуем поставить число

              if (backtrack()) return true; // Идем дальше

              board[r][c] = '.'; // Откат (backtrack)
            }
          }
          return false; // Если ни одно число не подошло
        }
      }
    }
    return true; // Поле полностью заполнено
  };

  backtrack();
}

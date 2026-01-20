export default {
  // Показывать ли отчет о покрытии тестами
  collectCoverage: true,
  // Папка, где лежат тесты
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  // Среда выполнения
  testEnvironment: 'node',

  preset: 'ts-jest',
  // Это заставит Jest понимать расширение .ts
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

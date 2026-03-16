/* eslint-env node */
/**
 * @file jest.config.js
 * @description Конфигурация Jest для TypeScript и React.
 * Директива 'eslint-env node' выше сообщает ESLint, что переменная 'module' определена.
 */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/jest-setup.ts'],
  moduleNameMapper: {
    // Мокаем импорты стилей, чтобы Jest не ломался на .css файлах
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    // Используем ts-jest для обработки .ts и .tsx файлов
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
};

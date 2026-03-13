/**
 * @jest-environment jsdom
 */

import { AuthService } from '../singleton.react';

describe.skip('AuthService Singleton: Corner Cases', () => {
  // Вспомогательный метод для сброса синглтона между тестами,
  // если вы добавили его в класс для тестирования.
  beforeEach(() => {
    localStorage.clear();
    // @ts-ignore: доступ к приватному свойству для полной очистки состояния тестов
    AuthService.instance = null;
  });

  /**
   * 1. Гарантия единственности (Referential Integrity)
   */
  test('должен возвращать абсолютно тот же объект (ссылочное равенство)', () => {
    const instance1 = AuthService.getInstance();
    const instance2 = AuthService.getInstance();

    expect(instance1).toBe(instance2);
    expect(instance1).toStrictEqual(instance2);
  });

  /**
   * 2. Инициализация из существующего хранилища (Hydration)
   * Кейс: Приложение упало или обновилось, но токен в localStorage остался.
   */
  test('должен корректно инициализироваться, если в localStorage уже есть токен', () => {
    localStorage.setItem('token', 'old_token');

    const auth = AuthService.getInstance();

    expect(auth.isAuthenticated).toBe(true);
  });

  /**
   * 3. Устойчивость к "гонке" вызовов (Race Conditions / Multiple access)
   * Хотя JS однопоточен, важно проверить, что многократный вызов метода
   * инициализации не создает побочных эффектов.
   */
  test('множественные вызовы getInstance не должны перезаписывать состояние', () => {
    const auth1 = AuthService.getInstance();
    auth1.login(); // Установили состояние

    const auth2 = AuthService.getInstance();
    expect(auth2.isAuthenticated).toBe(true); // Состояние сохранилось
  });

  /**
   * 4. Синхронизация с внешним миром (Side Effects)
   * Кейс: Если мы удалим токен вручную из localStorage, синглтон должен
   * отработать это (если в нем прописана такая логика).
   */
  test('logout должен очищать внешние зависимости (localStorage)', () => {
    const auth = AuthService.getInstance();
    auth.login();
    auth.logout();

    expect(localStorage.getItem('token')).toBeNull();
  });

  /**
   * 5. Защита от создания через "new"
   * Кейс: Проверка, что TypeScript действительно запрещает конструктор.
   */
  test('конструктор должен быть недоступен (runtime check)', () => {
    // В JS это все еще можно обойти, но мы проверяем логику приватности
    const constructorFunc = () => {
      // @ts-ignore
      new AuthService();
    };
    // Если конструктор приватный, в некоторых средах вызов упадет или
    // TypeScript выдаст ошибку на этапе компиляции.
    expect(constructorFunc).toThrow();
  });

  /**
   * 6. Обработка пустых/битых данных (Robustness)
   */
  test('не должен падать, если localStorage вернул пустую строку вместо null', () => {
    localStorage.setItem('token', '');
    const auth = AuthService.getInstance();

    // В зависимости от вашей логики (строгая проверка на длину строки)
    expect(auth.isAuthenticated).toBe(false);
  });
});

/**
 * @pattern Singleton (Одиночка)
 * @description Сервис для управления состоянием авторизации во всем приложении.
 * Используется, чтобы избежать создания нескольких обработчиков токенов.
 */
export class AuthService {
  private static instance: AuthService;
  private static isInternalConstructing: boolean = false; // Флаг доступа
  private _isLoggedIn: boolean = false;

  /** Приватный конструктор запрещает `new AuthService()` */
  private constructor() {
    // ЗАЩИТА В РАНТАЙМЕ:
    if (!AuthService.isInternalConstructing) {
      throw new Error('Ошибка: Используйте AuthService.getInstance() вместо new.');
    }

    // Инициализация: например, проверка токена в localStorage
    this._isLoggedIn = !!localStorage.getItem('token');
  }

  /** Геттер для получения статуса */
  public get isAuthenticated(): boolean {
    return this._isLoggedIn;
  }

  /**
   * Метод для получения единственного экземпляра сервиса.
   * @returns {AuthService} Экземпляр сервиса.
   */
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.isInternalConstructing = true; // Разрешаем создание
      AuthService.instance = new AuthService();
      AuthService.isInternalConstructing = false; // Сразу закрываем дверь
    }
    return AuthService.instance;
  }

  public login(): void {
    this._isLoggedIn = true;
    localStorage.setItem('token', 'secret_key');
    console.log('Пользователь вошел');
  }

  public logout(): void {
    this._isLoggedIn = false;
    localStorage.removeItem('token');
  }
}

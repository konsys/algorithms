/**
 * @pattern Singleton (Одиночка)
 *
 * @description
 * Гарантирует, что у класса есть только один экземпляр,
 * и предоставляет к нему глобальную точку доступа.
 *
 * @example
 * const settings1 = AppSettings.getInstance();
 * const settings2 = AppSettings.getInstance();
 * console.log(settings1 === settings2); // true
 */
class AppSettings {
  /**
   * 1. Храним единственный экземпляр в статическом свойстве.
   * Оно принадлежит самому классу, а не объектам.
   */
  private static instance: AppSettings | null = null;

  /** Свойство для примера данных */
  public theme: string = 'dark';

  /**
   * 2. ДЕЛАЕМ КОНСТРУКТОР ПРИВАТНЫМ.
   * Это самое важное: теперь нельзя написать `new AppSettings()`.
   */
  private constructor() {
    console.log('Настройки инициализированы один раз!');
  }

  /**
   * 3. Статический метод для получения доступа к объекту.
   * Если объекта еще нет — создаем, если есть — отдаем старый.
   *
   * @returns {AppSettings} Единственный экземпляр класса.
   */
  public static getInstance(): AppSettings {
    if (!AppSettings.instance) {
      AppSettings.instance = new AppSettings();
    }
    return AppSettings.instance;
  }

  /** Пример обычного метода */
  public save(): void {
    console.log('Настройки сохранены');
  }
}

// --- Использование ---

// ОШИБКА: Constructor of class 'AppSettings' is private and only accessible within the class declaration.
// const mySettings = new AppSettings();

// ПРАВИЛЬНО:
const configA = AppSettings.getInstance();
const configB = AppSettings.getInstance();

configA.theme = 'light';

console.log(configB.theme); // "light" (потому что это один и тот же объект)
console.info(configA === configB); // true

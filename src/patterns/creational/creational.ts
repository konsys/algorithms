/**
 * @pattern Singleton (Одиночка)
 * @description Гарантирует наличие только одного экземпляра класса.
 */
class Config {
  private static instance: Config;

  private constructor() {}

  public static getInstance(): Config {
    if (!Config.instance) Config.instance = new Config();
    return Config.instance;
  }
}

/**
 * @pattern Factory Method (Фабричный метод)
 * @description Определяет интерфейс создания объекта, но позволяет подклассам решать, какой класс инстанцировать.
 */
abstract class Logistic {
  abstract createTransport(): { deliver(): void };
}

/**
 * @pattern Abstract Factory (Абстрактная фабрика)
 * @description Создает семейства связанных объектов (например, кнопки и чекбоксы в стиле Windows или Mac).
 */

/**
 * @pattern Builder (Строитель)
 * @description Позволяет создавать сложные объекты пошагово (например, конструктор запросов или пиццы).
 */
class PizzaBuilderEx {
  private ingredients: string[] = [];

  /** @param ingredient Название ингредиента */
  addCheese(): this {
    this.ingredients.push('cheese');
    return this;
  }

  build() {
    return this.ingredients;
  }
}

/**
 * @pattern Prototype (Прототип)
 * @description Позволяет копировать объекты, не вдаваясь в подробности их реализации (метод clone).
 */

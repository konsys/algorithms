/**
 * @summary Преимущества использования Builder в TypeScript:
 *
 * 1. **Инкапсуляция**: Скрывает детали инициализации сложного объекта.
 * 2. **Пошаговость**: Позволяет конструировать объект частями или откладывать сборку.
 * 3. **Типизация**: Благодаря `this` в возвращаемых типах, IDE всегда знает доступные методы.
 */

/**
 * Продукт: Сложный объект, который мы собираем.
 */
class RequestBuilder {
  private url: string = '';
  private method: 'GET' | 'POST' | 'PUT' = 'GET';
  private headers: Record<string, string> = {};

  /**
   * Устанавливает целевой URL запроса.
   * @param url - Полный адрес эндпоинта.
   * @returns Текущий экземпляр строителя для цепочки вызовов.
   */
  public setUrl(url: string): this {
    this.url = url;
    return this;
  }

  /**
   * Задает HTTP метод.
   * @param method - Одно из значений: GET, POST или PUT.
   * @default 'GET'
   */
  public setMethod(method: 'GET' | 'POST' | 'PUT'): this {
    this.method = method;
    return this;
  }

  /**
   * Добавляет заголовок к запросу.
   * @example
   * builder.setHeader('Authorization', 'Bearer token');
   */
  public setHeader(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }

  /**
   * Финализирует сборку и возвращает готовый объект конфигурации.
   * @throws {Error} Если URL не был задан.
   */
  public build() {
    if (!this.url) throw new Error('URL is required');
    return {
      url: this.url,
      method: this.method,
      headers: this.headers,
    };
  }
}

/**
 * @pattern Adapter (Адаптер)
 * @description Обертка, которая делает интерфейс одного класса совместимым с другим.
 */
class TypeCtoUSBAdapter {
  constructor(private legacyDevice: { connectUSB: () => void }) {}

  connectTypeC() {
    this.legacyDevice.connectUSB();
  }
}

/**
 * @pattern Bridge (Мост)
 * @description Разделяет абстракцию и реализацию (например, Пульт и Телевизор разных брендов).
 */

/**
 * @pattern Composite (Компоновщик)
 * @description Группирует объекты в древовидную структуру (например, папки и файлы).
 */

/**
 * @pattern Decorator (Декоратор)
 * @description Динамически добавляет объекту новые обязанности (например, логирование вокруг метода).
 */
function log(target: any, key: string) {
  /* логика декоратора */
}

/**
 * @pattern Facade (Фасад)
 * @description Предоставляет простой интерфейс к сложной системе классов (например, одна кнопка "Запуск" для целого завода).
 */

/**
 * @pattern Flyweight (Легковес)
 * @description Экономит память, разделяя общее состояние между множеством объектов.
 */

/**
 * @pattern Proxy (Заместитель)
 * @description Подменяет реальный объект, контролируя доступ к нему (например, кеширующий прокси для API).
 */

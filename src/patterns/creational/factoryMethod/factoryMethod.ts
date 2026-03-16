/**
 * Паттерн "Фабричный метод" (Factory Method)
 *
 * Суть: Мы создаем специальный метод для создания объектов, вместо того
 * чтобы вызывать `new` напрямую.
 *
 * Зачем это нужно:
 * 1. Гибкость: Основной код не знает, какой именно объект будет создан (грузовик или судно).
 * 2. Расширяемость: Чтобы добавить новый вид транспорта, не нужно менять старый код.
 * 3. Локализация: Весь код по созданию объекта собран в одном месте.
 *
 * Аналогия: У вас есть "Завод". Вы знаете, что любой завод должен выпустить
 * продукт, но что это будет — кирпичи или айфоны — решает конкретный филиал.
 */

/**
 * Сравнение: Простая фабрика vs Фабричный метод
 *
 * @example 1. ПРОСТАЯ ФАБРИКА (Один метод на все случаи)
 * class SimpleTransportFactory {
 *   create(type) {
 *     if (type === 'truck') return new Truck();
 *     if (type === 'ship') return new Ship();
 *     // Чтобы добавить Самолет, ПРИДЕТСЯ МЕНЯТЬ этот код (плохо для OCP)
 *   }
 * }
 *
 * @example 2. ФАБРИЧНЫЙ МЕТОД (Делегирование подклассам)
 * // Базовый класс только задает стандарт
 * abstract class Logistics { abstract createTransport(); }
 *
 * // Новые типы добавляются созданием НОВОГО КЛАССА (хорошо для OCP)
 * class AirLogistics extends Logistics { createTransport() { return new Plane(); } }
 */

/**
 * @pattern Abstract Factory (Абстрактная фабрика)
 * @description Предоставляет интерфейс для создания семейств взаимосвязанных объектов,
 * не привязываясь к конкретным классам создаваемых объектов.
 *
 * @diff_from_factory_method
 * - Фабричный метод: создает ОДИН продукт (Транспорт).
 * - Абстрактная фабрика: создает СЕМЕЙСТВО продуктов (Транспорт + Топливо + Экипаж).
 *
 * @example
 * // Интерфейс фабрики для целого региона
 * interface RegionalFactory {
 *   createTransport(): Transport;
 *   createFuel(): Fuel;
 * }
 *
 * // Конкретная "Северная" фабрика (Грузовик на дизеле)
 * class NorthFactory implements RegionalFactory { ... }
 *
 * // Конкретная "Тропическая" фабрика (Корабль на мазуте)
 * class TropicalFactory implements RegionalFactory { ... }
 */

/**
 * @pattern Abstract Factory (Абстрактная фабрика)
 * @description Создает семейства связанных объектов (Продукт А + Продукт Б),
 * чтобы они всегда соответствовали друг другу по смыслу или бренду.
 *
 * @example Семейство: Транспорт + Топливо
 */

/**
 * 1. Интерфейс фабрики (общий план для всех регионов)
 */
class LogisticsFactory {
  createTransport() {
    throw new Error('Метод должен быть реализован');
  }

  createFuel() {
    throw new Error('Метод должен быть реализован');
  }
}

/**
 * 2. Конкретная фабрика "Арктика" (создает совместимую пару)
 */
class ArcticLogistics extends LogisticsFactory {
  createTransport() {
    return 'Снегоход';
  }

  createFuel() {
    return 'Арктическое дизельное топливо';
  }
}

/**
 * 3. Конкретная фабрика "Пустыня" (создает другую совместимую пару)
 */
class DesertLogistics extends LogisticsFactory {
  createTransport() {
    return 'Верблюжий караван';
  }

  createFuel() {
    return 'Вода и сено';
  }
}

/**
 * @usage Использование
 * Клиентский код работает с абстракциями, не зная, какой именно регион выбран.
 */
function startDelivery(factory: LogisticsFactory) {
  const vehicle = factory.createTransport();
  const fuel = factory.createFuel();
  console.log(`Едем на: ${vehicle}, заправляем: ${fuel}`);
}

// Запуск для Арктики
startDelivery(new ArcticLogistics());
// Запуск для Пустыни
startDelivery(new DesertLogistics());

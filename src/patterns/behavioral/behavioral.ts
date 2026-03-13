/**
 * @pattern Observer (Наблюдатель)
 * @description Рассылает уведомления всем подписанным объектам об изменении своего состояния.
 */
class NewsAgency {
  private listeners: Function[] = [];

  /** @param fn Функция обратного вызова */
  subscribe(fn: Function) {
    this.listeners.push(fn);
  }

  notify(data: string) {
    this.listeners.forEach((fn) => fn(data));
  }
}

/**
 * @pattern Strategy (Стратегия)
 * @description Выносит алгоритм в отдельный класс, чтобы его можно было менять на лету (например, способы оплаты).
 */
interface Payment {
  pay(amount: number): void;
}

class CreditCard implements Payment {
  pay(amount: number) {
    /* логика */
  }
}

/**
 * @pattern Command (Команда)
 * @description Превращает запрос в объект, позволяя передавать его как аргумент (например, кнопки интерфейса).
 */

/**
 * @pattern Iterator (Итератор)
 * @description Позволяет последовательно обходить элементы коллекции, не раскрывая её внутреннее устройство.
 */

/**
 * @pattern State (Состояние)
 * @description Позволяет объекту менять поведение при изменении его состояния (например, состояния заказа: Новый -> Оплачен).
 */

/**
 * @pattern Template Method (Шаблонный метод)
 * @description Определяет скелет алгоритма, перекладывая шаги на подклассы.
 */

/**
 * @pattern Mediator (Посредник)
 * @description Упрощает общение между классами, заставляя их общаться через один объект (например, диспетчер в аэропорту).
 */

/**
 * @pattern Memento (Снимок)
 * @description Позволяет сохранять и восстанавливать прошлые состояния объекта (функция Undo).
 */

/**
 * @pattern Chain of Responsibility (Цепочка обязанностей)
 * @description Передает запрос по цепочке обработчиков (например, мидлвары в Express.js).
 */

/**
 * @pattern Visitor (Посетитель)
 * @description Позволяет добавлять новые операции к группе классов, не меняя сами классы.
 */

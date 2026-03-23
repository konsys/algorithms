/**
 * @pattern Observer (Наблюдатель)
 * @description Рассылает уведомления всем подписанным объектам об изменении своего состояния.
 */
/**
 * Это классическое определение паттерна Observer. Чтобы лучше понять его суть, представь его как подписку на новости или уведомления в YouTube.
 * Как это работает «на пальцах»:
 * Издатель (Subject/Observable): Объект, у которого есть важные данные. Он хранит список всех, кто на него подписан.
 * Подписчик (Observer): Объект, который хочет узнать, когда данные изменятся.
 * Связь: Когда у Издателя что-то меняется, он проходит по своему списку и вызывает у каждого Подписчика метод «Обновись!».
 * Почему это круто?
 * Слабая связанность (Loose Coupling): Издателю всё равно, кто на него подписан (блогер, сервис аналитики или просто логгер).
 * Главное, чтобы у них был метод для обновления.
 * Динамика: Подписчики могут приходить и уходить прямо во время работы программы.
 * Аналогия с кодом (на словах):
 * Представь класс WeatherStation (Метеостанция). Она измеряет температуру.
 * У неё есть список observers.
 * Когда температура меняется, она вызывает:
 * for observer in observers: observer.update(new_temperature)
 * Один подписчик выведет это на экран, другой запишет в базу данных, а третий отправит SMS — метеостанции об этом знать не обязательно.
 */
  // 1. Интерфейс для всех подписчиков
export interface Observer {
  update(videoTitle: string): void;
}

// 2. Класс Издателя (Канал)
export class YoutubeChannel {
  private subscribers: Observer[] = []; // Список подписчиков

  // Метод для подписки
  subscribe(observer: Observer): void {
    this.subscribers.push(observer);
  }

  // Метод для отписки
  unsubscribe(observer: Observer): void {
    this.subscribers = this.subscribers.filter(sub => sub !== observer);
  }

  // Рассылка уведомления всем
  uploadVideo(title: string): void {
    console.log(`Канал загружает видео: ${title}`);
    this.subscribers.forEach(sub => sub.update(title));
  }
}

// 3. Конкретные подписчики
export class User implements Observer {
  constructor(private name: string) {
  }

  update(videoTitle: string): void {
    console.log(`[Уведомление для ${this.name}]: Вышло новое видео — ${videoTitle}`);
  }
}

// --- Использование ---

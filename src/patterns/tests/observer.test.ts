import { Observer, User, YoutubeChannel } from '../behavioral/observer/observer';

describe('Pattern: Observer (YoutubeChannel)', () => {
  let channel: YoutubeChannel;
  let user1: User;
  let user2: User;

  beforeEach(() => {
    // Создаем свежие объекты перед каждым тестом
    channel = new YoutubeChannel();
    user1 = new User('Иван');
    user2 = new User('Мария');
  });

  test('должен уведомлять всех подписанных пользователей при загрузке видео', () => {
    // Шпионим за методом update
    const spy1 = jest.spyOn(user1, 'update');
    const spy2 = jest.spyOn(user2, 'update');

    channel.subscribe(user1);
    channel.subscribe(user2);

    const videoTitle = 'Уроки TypeScript';
    channel.uploadVideo(videoTitle);

    // Проверяем, что метод вызван ровно 1 раз для каждого
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy1).toHaveBeenCalledWith(videoTitle);

    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledWith(videoTitle);
  });

  test('не должен уведомлять пользователя после отписки', () => {
    const spy1 = jest.spyOn(user1, 'update');

    channel.subscribe(user1);
    channel.unsubscribe(user1); // Сразу отписываемся

    channel.uploadVideo('Секретное видео');

    // Проверяем, что вызова не было
    expect(spy1).not.toHaveBeenCalled();
  });

  test('должен работать с "фейковыми" подписчиками (Mock Objects)', () => {
    // Создаем объект, который просто соответствует интерфейсу Observer
    const mockObserver: Observer = {
      update: jest.fn(),
    };

    channel.subscribe(mockObserver);
    channel.uploadVideo('Тест');

    expect(mockObserver.update).toHaveBeenCalledWith('Тест');
  });
});

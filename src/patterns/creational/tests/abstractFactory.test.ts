// Импортируем наши фабрики и классы
// import { WinFactory, MacFactory } from './gui-factories';

import { GUIFactory, MacFactory, renderUI, WinFactory } from '../abstractFactory/abstractFactory';

describe.skip('Abstract Factory Pattern', () => {
  describe.skip('WinFactory', () => {
    const factory = new WinFactory();

    test('должна создавать кнопку Windows', () => {
      const button = factory.createButton();

      // Проверяем наличие метода (интерфейс)
      expect(button).toHaveProperty('render');

      // Проверяем специфичное поведение через шпион (Spy)
      const consoleSpy = jest.spyOn(console, 'log');
      button.render();
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Win-кнопку'));
      consoleSpy.mockRestore();
    });

    test('должна создавать чекбокс Windows', () => {
      const checkbox = factory.createCheckbox();
      expect(checkbox).toHaveProperty('toggle');
    });
  });

  describe.skip('MacFactory', () => {
    const factory = new MacFactory();

    test('должна создавать продукты в стиле macOS', () => {
      const button = factory.createButton();
      const consoleSpy = jest.spyOn(console, 'log');

      button.render();

      // Проверяем, что это именно Mac-версия
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('macOS'));
      consoleSpy.mockRestore();
    });
  });

  describe.skip('Client Code Integration', () => {
    test('renderUI должен вызывать методы продуктов, созданных фабрикой', () => {
      // 1. Создаем моки для методов продуктов
      const renderMock = jest.fn();
      const toggleMock = jest.fn();

      // 2. Создаем мок-фабрику, которая возвращает наши моки
      const mockFactory: GUIFactory = {
        createButton: () => ({ render: renderMock }),
        createCheckbox: () => ({ toggle: toggleMock }),
      };

      // 3. Вызываем тестируемую функцию
      renderUI(mockFactory);

      // 4. Проверяем, что методы были вызваны
      expect(renderMock).toHaveBeenCalledTimes(1);
      expect(toggleMock).toHaveBeenCalledTimes(1);
    });
  });
});

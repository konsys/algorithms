import { fireEvent, render, screen } from '@testing-library/react';
import {
  AndroidFactory, FactoryContext, IOSFactory, MyForm, UIFactory,
} from '../creational/factoryMethod/factoryMethod.react';
/**
 * @description Тестирование паттерна "Абстрактная фабрика"
 * Проверяем, что фабрики возвращают компоненты с ожидаемым поведением.
 */

describe.skip('UI Abstract Factory', () => {
  /**
   * @test Проверка iOS фабрики
   */
  describe.skip('IOSFactory', () => {
    const factory: UIFactory = IOSFactory;

    test('should create a button with ios-btn class', () => {
      const { getByText } = render(
        factory.createButton({
          label: 'Click Me',
          onClick: () => {},
        })
      );

      const button = getByText('Click Me');
      expect(button.className).toBe('ios-btn');
    });

    test('should create an input with ios-input class', () => {
      const { getByPlaceholderText } = render(
        factory.createInput({
          placeholder: 'Name',
        })
      );

      expect(getByPlaceholderText('Name').className).toBe('ios-input');
    });
  });

  /**
   * @test Проверка Android фабрики
   */
  describe.skip('AndroidFactory', () => {
    const factory: UIFactory = AndroidFactory;

    test('should create a button with uppercase label for Android', () => {
      const { getByText } = render(
        factory.createButton({
          label: 'send',
          onClick: () => {},
        })
      );

      // AndroidFactory делает label.toUpperCase() по условию примера
      expect(getByText('SEND')).toBeInTheDocument();
      expect(getByText('SEND').className).toBe('md-btn');
    });
  });
});
describe.skip('MyForm Component with Abstract Factory', () => {
  /**
   * @test Проверка рендеринга для iOS
   */
  test('должен рендерить iOS стиль, когда используется IOSFactory', () => {
    render(
      <FactoryContext.Provider value={IOSFactory}>
        <MyForm />
      </FactoryContext.Provider>
    );

    const button = screen.getByRole('button', { name: /отправить/i });
    const input = screen.getByPlaceholderText(/введите имя/i);

    expect(button).toHaveClass('ios-btn');
    expect(input).toHaveClass('ios-input');
  });

  /**
   * @test Проверка рендеринга для Android (Material Design)
   */
  test('должен рендерить Android стиль (UPPERCASE), когда используется AndroidFactory', () => {
    render(
      <FactoryContext.Provider value={AndroidFactory}>
        <MyForm />
      </FactoryContext.Provider>
    );

    // AndroidFactory делает label.toUpperCase()
    const button = screen.getByRole('button', { name: /ОТПРАВИТЬ/ });

    expect(button).toHaveClass('md-btn');
    expect(button).toHaveTextContent('ОТПРАВИТЬ');
  });

  /**
   * @test Проверка интерактивности
   */
  test('кнопка формы должна вызывать alert при клике', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <FactoryContext.Provider value={IOSFactory}>
        <MyForm />
      </FactoryContext.Provider>
    );

    fireEvent.click(screen.getByRole('button'));

    expect(alertSpy).toHaveBeenCalledWith('Sent!');
    alertSpy.mockRestore();
  });
});

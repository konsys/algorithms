import React from 'react';

/**
 * @pattern Abstract Factory в React
 * @description Создание семейств UI-компонентов (Кнопка + Инпут) для разных систем.
 */

interface ButtonProps {
  label: string;
  onClick: () => void;
}

interface InputProps {
  placeholder: string;
}

/**
 * 1. Интерфейс фабрики компонентов
 */
export interface UIFactory {
  createButton(props: ButtonProps): React.ReactElement;

  createInput(props: InputProps): React.ReactElement;
}

/**
 * 2. Конкретная фабрика для iOS
 */
export const IOSFactory: UIFactory = {
  createButton: ({ label, onClick }) => (
    <button className="ios-btn" onClick={onClick}>
      {label}
    </button>
  ),
  createInput: ({ placeholder }) => <input className="ios-input" placeholder={placeholder} />,
};

/**
 * 3. Конкретная фабрика для Android (Material Design)
 */
export const AndroidFactory: UIFactory = {
  createButton: ({ label, onClick }) => (
    <button className="md-btn" onClick={onClick}>
      {label.toUpperCase()}
    </button>
  ),
  createInput: ({ placeholder }) => (
    <div className="md-wrapper">
      <input placeholder={placeholder} />
    </div>
  ),
};

/**
 * @usage Использование в компоненте через Context
 */
export const FactoryContext = React.createContext<UIFactory>(IOSFactory);

export const MyForm: React.FC = () => {
  const factory = React.useContext(FactoryContext);

  return (
    <form>
      {factory.createInput({ placeholder: 'Введите имя' })}
      {factory.createButton({ label: 'Отправить', onClick: () => alert('Sent!') })}
    </form>
  );
};

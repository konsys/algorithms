/**
 *
 * Этот паттерн часто называют «фабрикой фабрик».
 * Если обычная фабрика штампует один вид изделий,
 * то Abstract Factory — это целый завод с разными цехами,
 * которые выпускают комплекты вещей в едином стиле.
 *
 *
 * @pattern Abstract Factory (Абстрактная фабрика)
 *
 * @description
 * Этот паттерн позволяет создавать семейства связанных объектов, не привязываясь
 * к конкретным классам создаваемых продуктов.
 *
 * Представьте, что вы строите интерфейс:
 * - Если пользователь на Windows, фабрика создает "Windows-кнопку" и "Windows-чекбокс".
 * - Если на macOS — "Mac-кнопку" и "Mac-чекбокс".
 *
 * @example
 * // 1. Описываем интерфейсы продуктов
 * interface Button { render(): void; }
 * interface Checkbox { toggle(): void; }
 *
 * // 2. Описываем интерфейс самой фабрики
 * interface GUIFactory {
 *   createButton(): Button;
 *   createCheckbox(): Checkbox;
 * }
 *
 * // 3. Реализуем конкретную фабрику (например, для Windows)
 * class WinFactory implements GUIFactory {
 *   createButton() { return { render: () => console.log("Рисую Win-кнопку") }; }
 *   createCheckbox() { return { toggle: () => console.log("Переключаю Win-чекбокс") }; }
 * }
 * Семейственность: Продукты (кнопка и чекбокс) должны сочетаться друг с другом.
 * Вы не можете случайно смешать стиль Windows и macOS.
 * Абстракция: Ваш основной код работает с интерфейсом GUIFactory,
 * и ему всё равно, какая именно фабрика подсунута «под капот».
 * Избавление от if/else: Вместо того чтобы в каждом месте проверять ОС,
 * вы один раз создаете нужную фабрику при старте приложения.
 */
/**
 * @section Инициализация
 * Логика выбора конкретной фабрики на основе окружения (Environment).
 */

interface Button {
  render(): void;
}

interface Checkbox {
  toggle(): void;
}

export interface GUIFactory {
  createButton(): Button;

  createCheckbox(): Checkbox;
}

export class WinFactory implements GUIFactory {
  createButton() {
    return { render: () => console.log('Рисую Win-кнопку') };
  }

  createCheckbox() {
    return { toggle: () => console.log('Переключаю Win-чекбокс') };
  }
}

class MacButton implements Button {
  render() {
    console.log('🍏 Отрисовка стильной закругленной кнопки в стиле macOS');
  }
}

class MacCheckbox implements Checkbox {
  toggle() {
    console.log('🍏 Переключение чекбокса с плавной анимацией macOS');
  }
}

export class MacFactory implements GUIFactory {
  createButton(): Button {
    return new MacButton();
  }

  createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
}

function initializeApp(os: string): GUIFactory {
  if (os === 'Windows') {
    return new WinFactory();
  } else if (os === 'macOS') {
    return new MacFactory();
  }
  throw new Error('Неподдерживаемая операционная система');
}

/**
 * @section Клиентский код
 * Этот код вообще не знает, с какой ОС он работает.
 * Он просто просит "кнопку" у того, что ему дали.
 */
export function renderUI(factory: GUIFactory) {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();

  button.render();
  checkbox.toggle();
}

// ПРИМЕНЕНИЕ:
const currentOS = 'Windows'; // Обычно берется из системных настроек
const factory = initializeApp(currentOS);

renderUI(factory);

/**
 * Prototype (Прототип) — это порождающий паттерн проектирования,
 * который позволяет копировать объекты, не привязываясь к их конкретным классам.
 * Суть на пальцах
 * Вместо того чтобы создавать объект «с нуля» через new и вручную копировать все поля,
 * вы просите сам объект: «Склонируй себя». Это полезно, когда создание объекта обычным
 * путем обходится слишком «дорого» или когда вы не знаете заранее, какой именно класс нужно клонировать.
 * Реализация на TypeScript
 * В современном TypeScript/JavaScript метод clone() часто реализуется вручную,
 * так как встроенные механизмы (вроде Object.assign) делают лишь «поверхностную» копию.
 */
  // Интерфейс прототипа
interface Prototype {
  clone(): Prototype;
}

// Конкретный класс
export class Document implements Prototype {
  public title: string;
  public content: string;
  private metadata: string[]; // Скрытые данные

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
    this.metadata = ['v1.0', 'Draft'];
  }

  // Метод клонирования
  public clone(): this {
    // Создаем новый объект того же класса
    const clone = Object.create(this);

    // Копируем значения полей
    clone.title = this.title;
    clone.content = this.content;
    // Для глубокого копирования массивов/объектов:
    clone.metadata = [...this.metadata];

    return clone;
  }

  public getInfo() {
    console.log(`Документ: ${this.title}, Мета: ${this.metadata}`);
  }
}

// Использование
const original = new Document('Отчет', 'Секретные данные...');
const copy = original.clone();

copy.title = 'Копия отчета';

original.getInfo(); // Документ: Отчет...
copy.getInfo();     // Документ: Копия отчета...
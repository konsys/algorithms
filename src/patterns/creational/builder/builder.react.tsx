/**
 * Строитель конфигурации таблицы.
 * Позволяет декларативно описать колонки перед рендерингом.
 */
class TableBuilder<T> {
  private columns: Array<{ key: keyof T; label: string }> = [];

  /** Добавляет колонку в таблицу */
  addColumn(key: keyof T, label: string): this {
    this.columns.push({ key, label });
    return this;
  }

  /** Возвращает готовую конфигурацию */
  build() {
    return this.columns;
  }
}

type User = {
  name?: string;
  id?: string;
};

// Использование в компоненте
const columns = new TableBuilder<User>()
  .addColumn('id', 'ID')
  .addColumn('name', 'Имя пользователя')
  .build();

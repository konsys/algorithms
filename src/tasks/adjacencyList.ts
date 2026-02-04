// Описываем структуру графа
type GraphEx = {
  [key: string]: string[];
};

// Пример: карта дорог между городами
const travelGraphEx: GraphEx = {
  Москва: ['Питер', 'Казань'],
  Питер: ['Москва', 'Мурманск'],
  Казань: ['Москва'],
  Мурманск: ['Питер'],
};


class SimpleGraphEx {
  // Используем Map для хранения связей
  private adjacencyList: Map<string, string[]> = new Map();

  // Добавляем новый узел (вершину)
  addVertex(vertex: string) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  // Добавляем связь (ребро) между двумя узлами
  addEdge(start: string, end: string) {
    this.adjacencyList.get(start)?.push(end);
    this.adjacencyList.get(end)?.push(start); // Для неориентированного графа
  }

  // Показать весь граф в консоли
  show() {
    console.log(this.adjacencyList);
  }

  // Новый метод для проверки связи
  hasEdge(v1: string, v2: string): boolean {
    const neighbors = this.adjacencyList.get(v1);
    return neighbors ? neighbors.includes(v2) : false;
  }

  removeEdge(v1: string, v2: string): void {
    // Получаем список соседей для первой вершины и фильтруем, удаляя v2
    const list1 = this.adjacencyList.get(v1);
    if (list1) {
      this.adjacencyList.set(v1, list1.filter(neighbor => neighbor !== v2));
    }

    // То же самое для второй вершины (так как граф неориентированный)
    const list2 = this.adjacencyList.get(v2);
    if (list2) {
      this.adjacencyList.set(v2, list2.filter(neighbor => neighbor !== v1));
    }
  }

  // Удаляет вершину (узел) и все связи, которые к ней ведут
  removeVertex(vertex: string) {
    // 1. Проверяем, есть ли такая вершина в нашем списке
    if (!this.adjacencyList.has(vertex)) {
      return; // Если вершины нет, ничего делать не нужно
    }

    // 2. Нам нужно "пройтись" по всем соседям этой вершины
    // и удалить связь с удаляемой вершиной у них
    const neighbors = this.adjacencyList.get(vertex);

    if (neighbors) {
      // Пока в массиве соседей кто-то есть...
      while (neighbors.length) {
        // Извлекаем последнего соседа из списка
        const adjacentVertex = neighbors.pop();

        // Если сосед существует, вызываем метод удаления связи (ребра)
        if (adjacentVertex) {
          // Этот метод удалит 'vertex' из списка связей соседа 'adjacentVertex'
          this.removeEdge(vertex, adjacentVertex);
        }
      }
    }

    // 3. Когда все связи разорваны, окончательно удаляем саму вершину из Map
    this.adjacencyList.delete(vertex);
  }

  hasVertex(vertex: string): boolean {
    return this.adjacencyList.has(vertex);
  }

  /**
   * Возвращает список всех соседей (связей) вершины.
   * Если вершины не существует, возвращает null или undefined.
   * @param vertex Название вершины
   */
  getVertex(vertex: string): string[] | undefined {
    // Проверяем, существует ли вершина
    if (!this.hasVertex(vertex)) {
      console.error(`Ошибка: Вершина "${vertex}" не найдена.`);
      return undefined;
    }

    // Возвращаем копию массива соседей, чтобы нельзя было
    // случайно изменить данные графа извне напрямую
    const neighbors = this.adjacencyList.get(vertex);
    return neighbors ? [...neighbors] : [];
  }

  findShortestPath(start: string, end: string): string[] | null {
    if (!this.hasVertex(start) || !this.hasVertex(end)) return null;

    const queue: string[] = [start];
    const visited = new Set<string>([start]);
    const previous = new Map<string, string | null>(); // Для восстановления пути

    previous.set(start, null);

    while (queue.length > 0) {
      const current = queue.shift()!;

      if (current === end) {
        // Собираем путь обратно от конца к началу
        const path: string[] = [];
        let temp: string | null = end;
        while (temp !== null) {
          path.push(temp);
          temp = previous.get(temp) || null;
        }
        return path.reverse();
      }

      const neighbors = this.getVertex(current) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          previous.set(neighbor, current);
          queue.push(neighbor);
        }
      }
    }

    return null; // Путь не найден
  }
  
}

// Пример использования:
const myGraph = new SimpleGraphEx();
myGraph.addVertex('A');
myGraph.addVertex('B');
myGraph.addEdge('A', 'B');
myGraph.show(); // Map(2) { 'A' => ['B'], 'B' => ['A'] }
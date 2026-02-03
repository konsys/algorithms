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
}

// Пример использования:
const myGraph = new SimpleGraphEx();
myGraph.addVertex('A');
myGraph.addVertex('B');
myGraph.addEdge('A', 'B');
myGraph.show(); // Map(2) { 'A' => ['B'], 'B' => ['A'] }
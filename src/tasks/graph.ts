class GraphClass<T> {
  // Список смежности: ключ — узел, значение — массив соседних узлов
  private adjacencyList: Map<T, T[]>;

  constructor() {
    this.adjacencyList = new Map();
  }

  /**
   * Добавляет новый узел в граф
   */
  addVertex(vertex: T): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  /**
   * Создает связь (ребро) между двумя узлами
   */
  addEdge(source: T, destination: T): void {
    // Если узлов еще нет, создаем их
    if (!this.adjacencyList.has(source)) this.addVertex(source);
    if (!this.adjacencyList.has(destination)) this.addVertex(destination);

    // Добавляем связь в обе стороны (для неориентированного графа)
    this.adjacencyList.get(source)?.push(destination);
    this.adjacencyList.get(destination)?.push(source);
  }

  /**
   * Классический обход в ширину (BFS)
   * Просто посещает все узлы и выводит их
   */
  bfs(startNode: T): T[] {
    const queue: T[] = [startNode];
    const visited = new Set<T>();
    const result: T[] = [];

    visited.add(startNode);

    while (queue.length > 0) {
      // Извлекаем первый элемент из очереди
      const currentNode = queue.shift()!;
      result.push(currentNode);

      // Получаем соседей и добавляем в очередь тех, кого еще не посещали
      const neighbors = this.adjacencyList.get(currentNode) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }

  /**
   * Поиск кратчайшего пути между двумя узлами с помощью BFS
   */
  findShortestPath(start: T, end: T): T[] | null {
    const queue: T[] = [start];
    const visited = new Set<T>([start]);

    // Храним информацию о том, откуда мы пришли в каждый узел
    const parents = new Map<T, T | null>();
    parents.set(start, null);

    while (queue.length > 0) {
      const current = queue.shift()!;

      if (current === end) {
        return this.reconstructPath(parents, end);
      }

      for (const neighbor of this.adjacencyList.get(current) || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          parents.set(neighbor, current);
          queue.push(neighbor);
        }
      }
    }

    return null; // Путь не найден
  }

  private reconstructPath(parents: Map<T, T | null>, end: T): T[] {
    const path: T[] = [];
    let current: T | null = end;
    while (current !== null) {
      path.push(current);
      current = parents.get(current) || null;
    }
    return path.reverse();
  }
}

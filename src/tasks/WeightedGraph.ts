type Edge = { node: string; weight: number };

export class WeightedGraph {
  // Список смежности теперь хранит объекты с весом
  private adjacencyList: Map<string, Edge[]> = new Map();

  get vertex() {
    return this.adjacencyList;
  }

  addVertex(vertex: string) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  /**
   * Добавляет ребро с весом (расстоянием).
   * По умолчанию вес равен 1.
   */
  addEdge(start: string, end: string, weight: number = 1) {
    this.addVertex(start);
    this.addVertex(end);

    // Добавляем в обе стороны (неориентированный граф)
    this.adjacencyList.get(start)?.push({ node: end, weight });
    this.adjacencyList.get(end)?.push({ node: start, weight });
  }

  show() {
    let output = '\n--- Состояние взвешенного графа ---\n';
    this.adjacencyList.forEach((neighbors, vertex) => {
      const neighborInfo = neighbors.map((n) => `${n.node}(${n.weight}км)`).join(', ');
      output += `${vertex} => ${neighborInfo}\n`;
    });
    console.log(output);
  }

  hasVertex(vertex: string): boolean {
    return this.adjacencyList.has(vertex);
  }

  getNeighbors(vertex: string): Edge[] | null {
    const neighbors = this.adjacencyList.get(vertex);
    return neighbors ? [...neighbors] : null;
  }

  removeEdge(v1: string, v2: string) {
    const list1 = this.adjacencyList.get(v1);
    if (list1) {
      this.adjacencyList.set(
        v1,
        list1.filter((e) => e.node !== v2)
      );
    }

    const list2 = this.adjacencyList.get(v2);
    if (list2) {
      this.adjacencyList.set(
        v2,
        list2.filter((e) => e.node !== v1)
      );
    }
  }

  removeVertex(vertex: string) {
    if (!this.adjacencyList.has(vertex)) return;

    const neighbors = this.adjacencyList.get(vertex);
    if (neighbors) {
      // Копируем массив, так как оригинальный будет мутировать
      const neighborsCopy = [...neighbors];
      for (const edge of neighborsCopy) {
        this.removeEdge(vertex, edge.node);
      }
    }
    this.adjacencyList.delete(vertex);
  }

  /**
   * Алгоритм Дейкстры для поиска кратчайшего пути по весам (километрам).
   */
  findShortestPath(start: string, end: string): string[] | null {
    if (!this.hasVertex(start) || !this.hasVertex(end)) return null;

    const distances: Record<string, number> = {};
    const previous: Record<string, string | null> = {};
    const pq = new SimplePriorityQueue();

    // Начальная инициализация
    this.adjacencyList.forEach((_, vertex) => {
      if (vertex === start) {
        distances[vertex] = 0;
        pq.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        pq.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    });

    while (!pq.isEmpty()) {
      const current = pq.dequeue()!;

      if (current === end) {
        // Восстановление пути
        const path: string[] = [];
        let temp: string | null = end;
        while (temp) {
          path.push(temp);
          temp = previous[temp];
        }
        return path.reverse();
      }

      if (distances[current] === Infinity) break;

      const neighbors = this.adjacencyList.get(current) || [];
      for (const neighbor of neighbors) {
        // Считаем расстояние до соседа через текущий узел
        const candidate = distances[current] + neighbor.weight;

        if (candidate < distances[neighbor.node]) {
          distances[neighbor.node] = candidate;
          previous[neighbor.node] = current;
          pq.enqueue(neighbor.node, candidate);
        }
      }
    }

    return null;
  }
}

/**
 * Вспомогательный класс для работы алгоритма Дейкстры.
 * В идеале здесь должна быть Двоичная Куча (Binary Heap),
 * но для учебных целей достаточно сортировки массива.
 */
class SimplePriorityQueue {
  private values: { node: string; priority: number }[] = [];

  enqueue(node: string, priority: number) {
    this.values.push({ node, priority });
    this.sort();
  }

  dequeue(): string | undefined {
    return this.values.shift()?.node;
  }

  isEmpty(): boolean {
    return this.values.length === 0;
  }

  private sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

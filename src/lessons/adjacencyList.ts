type Graph = {
  [key: string]: string[];
};

const travelGraph: Graph = {
  Moscow: ['Piter', 'Kazan'],
  Piter: ['Moscow', 'Murmansk'],
  Kazan: ['Moscow'],
  Murmansk: ['Piter'],
};

export class SimpleGraph {
  private adjacencyList: Map<string, string[]> = new Map();

  get vertex() {
    return this.adjacencyList;
  }

  // Добавляем новый узел (вершину)
  addVertex(vertex: string) {
    if (!this.vertex.has(vertex)) {
      this.vertex.set(vertex, []);
    }
  }

  // Добавляем связь (ребро)
  addEdge(start: string, end: string) {
    this.addVertex(start); // Гарантируем наличие старта
    this.addVertex(end); // Гарантируем наличие конца

    this.vertex.get(start)?.push(end);
    this.vertex.get(end)?.push(start);
  }

  show() {
    let output = '\n--- Состояние графа ---\n';
    this.vertex.forEach((neighbors, vertex) => {
      output += `${vertex} => ${neighbors.join(', ')}\n`;
    });
    console.log(output);
  }

  hasEdge(v1: string, v2: string): boolean {
    return Boolean(this.vertex.get(v1)?.includes(v2));
  }

  hasVertex(vertex: string): boolean {
    return this.vertex.has(vertex);
  }

  getVertex(vertex: string): string[] | null {
    if (!this.hasVertex(vertex)) {
      return null;
    }
    const neighbors = this.vertex.get(vertex);
    return neighbors ? [...neighbors] : [];
  }

  removeEdge(v1: string, v2: string) {
    const list1 = this.vertex.get(v1);
    if (list1) {
      this.vertex.set(
        v1,
        list1.filter((neighbor) => neighbor !== v2)
      );
    }

    const list2 = this.vertex.get(v2);
    if (list2) {
      this.vertex.set(
        v2,
        list2.filter((neighbor) => neighbor !== v1)
      );
    }
  }

  removeVertex(vertex: string) {
    if (!this.vertex.has(vertex)) {
      return;
    }

    const neighbors = this.vertex.get(vertex);

    if (neighbors) {
      while (neighbors.length) {
        const adjacentVertex = neighbors.pop();

        if (adjacentVertex) {
          this.removeEdge(vertex, adjacentVertex);
        }
      }
    }

    this.vertex.delete(vertex);
  }

  findShortestPath(start: string, end: string): string[] | null {
    // 1. ПРОВЕРКА: Если одной из точек нет в графе, путь найти невозможно.
    if (!this.hasVertex(start) || !this.hasVertex(end)) return null;

    // 2. ОЧЕРЕДЬ (Queue): Хранит узлы, которые нужно посетить. Начинаем со старта.
    const queue: string[] = [start];

    // 3. ПОСЕЩЕННЫЕ (Visited): Чтобы не ходить кругами и не попадать в бесконечный цикл.
    const visited = new Set<string>([start]);

    // 4. КАРТА ПРЕДКОВ (Previous): Ключ — город, значение — откуда мы в него пришли.
    // Это нужно, чтобы в конце "отмотать" путь назад.
    const previous = new Map<string, string | null>();
    previous.set(start, null); // У старта нет предка

    // 5. ЦИКЛ: Работает, пока в очереди есть города.
    while (queue.length > 0) {
      // Извлекаем ПЕРВЫЙ элемент из очереди (shift)
      const current = queue.shift()!;

      // 6. УСПЕХ: Если текущий город — это цель, начинаем сборку пути.
      if (current === end) {
        const path: string[] = [];
        let temp: string | null = end;

        // Идем по цепочке предков от конца к началу
        while (temp !== null) {
          path.push(temp);
          temp = previous.get(temp) || null;
        }
        return path.reverse(); // Разворачиваем, чтобы было [старт, ..., конец]
      }

      // 7. ПОИСК СОСЕДЕЙ: Смотрим, куда можно поехать из текущего города.
      const neighbors = this.getVertex(current) || [];
      for (const neighbor of neighbors) {
        // Если мы в этом городе еще не были:
        if (!visited.has(neighbor)) {
          // Помечаем как посещенный
          visited.add(neighbor);

          // Запоминаем, что пришли сюда из current
          previous.set(neighbor, current);

          // Добавляем в конец очереди на проверку
          queue.push(neighbor);
        }
      }
    }

    // 8. ПУСТОТА: Если очередь кончилась, а цель не найдена — пути нет.
    return null;
  }
}

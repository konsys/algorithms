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
}

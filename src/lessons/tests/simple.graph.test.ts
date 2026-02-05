import { SimpleGraph } from '../adjacencyList'; // Путь к вашему файлу

describe.skip('SimpleGraph', () => {
  let graph: SimpleGraph;

  // Перед каждым тестом создаем новый экземпляр графа
  beforeEach(() => {
    graph = new SimpleGraph();
  });

  test('addEdge должен создавать связь между двумя узлами', () => {
    graph.addEdge('A', 'B');

    expect(graph.hasEdge('A', 'B')).toBe(true);
    expect(graph.hasEdge('B', 'A')).toBe(true); // Проверка двусторонности
  });

  test('hasEdge должен возвращать false, если связи нет', () => {
    graph.addVertex('A');
    graph.addVertex('B');

    expect(graph.hasEdge('A', 'B')).toBe(false);
  });

  test('hasEdge должен возвращать false для несуществующих узлов', () => {
    expect(graph.hasEdge('Z', 'X')).toBe(false);
  });

  test('removeEdge должен удалять связь между узлами', () => {
    graph.addEdge('A', 'B');
    expect(graph.hasEdge('A', 'B')).toBe(true); // Сначала она есть

    graph.removeEdge('A', 'B');
    expect(graph.hasEdge('A', 'B')).toBe(false); // Теперь её нет
    expect(graph.hasEdge('B', 'A')).toBe(false); // И в обратную сторону тоже
  });

  test('должен отображать граф в консоли до и после удаления связи', () => {
    graph.addVertex('Moscow');
    console.log('\naddVertex Moscow');
    graph.show();

    // 1. Подготовка данных
    graph.addEdge('Moscow', 'Piter');
    console.log('\naddEdge Moscow => Piter');
    graph.show();

    console.table(graph.vertex);
  });
});

describe.skip('SimpleGraph: removeVertex', () => {
  let graph: SimpleGraph;

  // Перед каждым тестом создаем новый чистый экземпляр графа
  beforeEach(() => {
    graph = new SimpleGraph();
  });

  test('должен полностью удалить вершину из списка смежности', () => {
    graph.addVertex('Moscow');
    graph.removeVertex('Moscow');

    // Проверяем, что ключа больше нет в Map
    expect(graph.hasVertex('Moscow')).toBe(false);
  });

  test('должен удалить все связи с удаляемой вершиной у её соседей', () => {
    // Подготовка: Moscow <-> Piter, Moscow <-> Kazan
    graph.addEdge('Moscow', 'Piter');
    graph.addEdge('Moscow', 'Kazan');

    graph.removeVertex('Moscow');

    // Самой Москвы нет
    expect(graph.hasVertex('Moscow')).toBe(false);

    // Piter и Kazan остались, но Москва исчезла из их списков связей
    expect(graph.hasEdge('Piter', 'Moscow')).toBe(false);
    expect(graph.hasEdge('Kazan', 'Moscow')).toBe(false);

    // Проверка через внутренности Map (убедимся, что массивы пусты)
    expect(graph.getVertex('Piter')).toEqual([]);
    expect(graph.getVertex('Kazan')).toEqual([]);
  });

  test('не должен ломаться при удалении несуществующей вершины', () => {
    graph.addVertex('Piter');

    // Пытаемся удалить то, чего нет
    expect(() => {
      graph.removeVertex('Omsk');
    }).not.toThrow();

    // Существующие данные не должны пострадать
    expect(graph.hasVertex('Piter')).toBe(true);
  });

  test('должен корректно очистить связи в сложном графе', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'C');

    graph.removeVertex('A');

    expect(graph.hasVertex('A')).toBe(false);
    expect(graph.hasEdge('B', 'C')).toBe(true);

    // Исправлено: используем getVertex для проверки массива соседей
    const neighborsB = graph.getVertex('B');
    expect(neighborsB).toContain('C');
    expect(neighborsB).not.toContain('A');
  });

  test('должен находить кратчайший путь (самый короткий по количеству узлов)', () => {
    // Длинный путь: Moscow -> Piter -> Murmansk (3 узла, 2 шага)
    graph.addEdge('Moscow', 'Piter');
    graph.addEdge('Piter', 'Murmansk');

    // Короткий путь: Moscow -> Murmansk напрямую (2 узла, 1 шаг)
    graph.addEdge('Moscow', 'Murmansk');

    const path = graph.findShortestPath('Moscow', 'Murmansk');

    // BFS обязан вернуть прямой путь, так как он короче
    expect(path).toEqual(['Moscow', 'Murmansk']);
  });

  test('должен находить путь из 3 узлов, если путь из 2 невозможен', () => {
    graph.addEdge('A', 'B');
    graph.addEdge('B', 'C');
    graph.addEdge('A', 'D');
    graph.addEdge('D', 'E');
    graph.addEdge('E', 'C');

    // Путь A-B-C (длина 2) короче, чем A-D-E-C (длина 3)
    const path = graph.findShortestPath('A', 'C');
    expect(path).toEqual(['A', 'B', 'C']);
  });
});

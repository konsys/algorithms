import { SimpleGraph } from '../adjacencyList'; // Путь к вашему файлу

describe('SimpleGraph', () => {
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

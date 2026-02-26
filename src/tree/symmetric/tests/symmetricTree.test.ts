import { isSymmetric, TreeNode } from '../symmetricTree';

// Вспомогательная функция для создания дерева из массива [1, 2, 2, null, 3...]
function createTree(arr: (number | null)[]): TreeNode | null {
  if (arr.length === 0) return null;
  const nodes = arr.map((val) => (val !== null ? new TreeNode(val) : null));
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i] !== null) {
      const leftIdx = 2 * i + 1;
      const rightIdx = 2 * i + 2;
      if (leftIdx < nodes.length) nodes[i]!.left = nodes[leftIdx];
      if (rightIdx < nodes.length) nodes[i]!.right = nodes[rightIdx];
    }
  }
  return nodes[0];
}

describe.skip('Symmetric Tree', () => {
  test('Example 1: Symmetric tree [1,2,2,3,4,4,3] should return true', () => {
    const root = createTree([1, 2, 2, 3, 4, 4, 3]);
    expect(isSymmetric(root)).toBe(true);
  });

  test('Example 2: Asymmetric tree [1,2,2,null,3,null,3] should return false', () => {
    const root = createTree([1, 2, 2, null, 3, null, 3]);
    expect(isSymmetric(root)).toBe(false);
  });

  test('Empty tree should return true', () => {
    expect(isSymmetric(null)).toBe(true);
  });

  test('Single node tree should return true', () => {
    const root = new TreeNode(1);
    expect(isSymmetric(root)).toBe(true);
  });

  test('Tree with different values should return false', () => {
    const root = createTree([1, 2, 3]); // Слева 2, справа 3
    expect(isSymmetric(root)).toBe(false);
  });

  test('Deep asymmetric tree should return false', () => {
    // Структура, где зеркальность нарушена на большой глубине
    const root = createTree([1, 2, 2, 3, 4, 4, 5]);
    expect(isSymmetric(root)).toBe(false);
  });
});

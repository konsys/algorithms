import { TreeNode } from '../symmetricTree';

export function isSymmetricStack(root: TreeNode | null): boolean {
  if (!root) return true;

  const stack: (TreeNode | null)[] = [root.left, root.right];

  while (stack.length > 0) {
    const t2 = stack.pop()!;
    const t1 = stack.pop()!;

    if (t1 === null && t2 === null) continue;

    if (t1 === null || t2 === null || t1.val !== t2.val) return false;

    stack.push(t1.left);
    stack.push(t2.right);

    stack.push(t1.right);
    stack.push(t2.left);
  }
  return true;
}

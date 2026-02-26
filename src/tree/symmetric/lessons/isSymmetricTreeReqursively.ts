import { TreeNode } from '../symmetricTree';

export function isSymmetricTreeReqursively(root: TreeNode | null): boolean {
  if (!root) {
    return true;
  }
  return checkReq(root.left, root.right);
}

function checkReq(t1: TreeNode | null, t2: TreeNode | null): boolean {
  if (t1 === null && t2 === null) {
    return true;
  }

  if (!t1 || !t2) {
    return false;
  }

  if (t1.val !== t2.val) {
    return false;
  }
  
  return checkReq(t1.left, t2.right) && checkReq(t1.right, t2.left);
}

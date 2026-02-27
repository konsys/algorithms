export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function rotateRight(head: ListNode | null, k: number): ListNode | null {
  if (!head || !head.next || k === 0) {
    return head;
  }

  let lastNode: ListNode = head;
  let length: number = 1;

  while (lastNode.next) {
    lastNode = lastNode.next;
    length++;
  }

  k = k % length;
  if (k === 0) {
    return head;
  }

  lastNode.next = head;

  let stepsToNewTail: number = length - k;
  let newTail: ListNode = head;

  for (let i = 0; i < stepsToNewTail - 1; i++) {
    newTail = newTail.next!;
  }

  const newHead: ListNode | null = newTail.next;
  newTail.next = null;

  return newHead;
}

export class TreeNode{
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null){
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
  }
}

export function isSymmetric(root: TreeNode | null): boolean {
  if(!root) return true;

  return isMirror(root.left, root.right);
}

function isMirror(t1: TreeNode | null, t2: TreeNode | null): boolean {
  if(t1 === null && t2 === null) return true

  if(t1 === null || t2 === null) return false;

  if(t1.val !== t2.val) return false;

  /*

  В зеркале всё работает наоборот: лево становится право, а право становится лево.
Почему мы пишем именно так?
Представь, что у тебя в руках две одинаковые детали конструктора (две ветки дерева). Чтобы они были зеркальными, ты должен сравнить их края:
isMirror(t1.left, t2.right) — мы сравниваем самый левый край первой детали с самым правым краем второй. Это внешние стороны нашего «зеркала».
isMirror(t1.right, t2.left) — мы сравниваем внутренний край первой детали с внутренним краем второй. Они смотрят друг на друга.
&& (логическое И) — мы говорим программе: «Дерево симметрично только в том случае, если И внешние края совпали, И внутренние края совпали».
Пример на руках (пальцах)
Поставь ладони перед собой (как будто ты молишься или хлопаешь). Твои мизинцы — это внешние края, а большие пальцы — внутренние.
Чтобы руки были зеркальны:
Твой левый мизинец должен соответствовать правому мизинцу (t1.left -> t2.right).
Твой левый большой палец должен соответствовать правому большому пальцу (t1.right -> t2.left).
Если написать по-другому?
Если ты напишешь isMirror(t1.left, t2.left), то ты будешь проверять, являются ли две ветки одинаковыми (копиями), а не зеркальными.
Коротко:
t1.left + t2.right = проверка «по краям».
t1.right + t2.left = проверка «в середине».
Если оба условия true — значит, у нас идеальное зеркальное отражение.
Кстати, в твоем вопросе была опечатка: t2.right во втором вызове. Правильно всегда чередовать: лево одного с право другого.

*/
  return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.right)
}
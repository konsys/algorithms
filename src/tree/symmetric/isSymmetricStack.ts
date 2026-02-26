import { TreeNode } from "./symmetricTree";

export function isSymmetricStack(root: TreeNode | null): boolean {
    if (!root) return true;

    // Стек будет хранить пары узлов, которые нужно сравнить
    const stack: (TreeNode | null)[] = [root.left, root.right];

    while (stack.length > 0) {
        // Достаем два узла (LIFO - Last In, First Out)
        const t2 = stack.pop()!;
        const t1 = stack.pop()!;

        // 1. Если оба пустые - эта ветка симметрична, проверяем дальше
        if (t1 === null && t2 === null) continue;

        // 2. Если один пустой ИЛИ значения не равны - симметрия сломана
        if (t1 === null || t2 === null || t1.val !== t2.val) return false;

        // 3. Добавляем детей парами для будущих проверок:
        
        // Внешняя пара: левый от левого и правый от правого
        stack.push(t1.left);
        stack.push(t2.right);

        // Внутренняя пара: правый от левого и левый от правого
        stack.push(t1.right);
        stack.push(t2.left);
    }

    return true; // Если дошли до конца и не нашли ошибок
}
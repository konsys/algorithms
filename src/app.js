import {BinarySearchTree} from './binarySearchTree.js'


console.log(1)

const myTree = new BinarySearchTree();

// Inserting values
myTree.insert(54); // Root
myTree.insert(20); // Left of 54
myTree.insert(72); // Right of 54
myTree.insert(19); // Left of 20
myTree.insert(24); // Right of 20
myTree.insert(58); // Left of 72
myTree.insert(85); // Right of 72

console.log(myTree);


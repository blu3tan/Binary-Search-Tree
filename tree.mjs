import Node from './node.mjs';
import mergeSort from './merge-sort.mjs';

class Tree {
	constructor(array = []) {
		this.array = array;
		this.root = this.buildTree(array);
		console.log(mergeSort(array));
	}

	buildTree(array) {
		if (array.length < 1) return null;
		let sortedArray = mergeSort(array);
		let mid = Math.floor(sortedArray.length / 2);
		let rootNode = new Node(sortedArray[mid]);
		rootNode.left = this.buildTree(sortedArray.slice(0, mid));
		rootNode.right = this.buildTree(sortedArray.slice(mid + 1));

		return rootNode;
	}
	//Shows the tree structure in the console
	prettyPrint(node = this.root, prefix = '', isLeft = true) {
		if (node === null) {
			return;
		}
		if (node.right !== null) {
			this.prettyPrint(
				node.right,
				`${prefix}${isLeft ? '│   ' : '    '}`,
				false
			);
		}
		console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
		if (node.left !== null) {
			this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
		}
	}
}

let sample = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const newTree = new Tree(sample);

newTree.prettyPrint();

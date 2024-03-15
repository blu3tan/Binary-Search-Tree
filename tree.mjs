import Node from './node.mjs';
import mergeSort from './merge-sort.mjs';

class Tree {
	constructor(array = []) {
		this.array = array;
		this.root = this.buildTree(array);
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

	insert(value) {
		if (this.root == null) return (this.root = new Node(value));
		let currentNode = this.root;

		while (currentNode) {
			if (currentNode.data == value) return;
			if (currentNode.data > value) {
				if (currentNode.left == null)
					return (currentNode.left = new Node(value));
				currentNode = currentNode.left;
			} else if (currentNode.data < value) {
				if (currentNode.right == null)
					return (currentNode.right = new Node(value));
				currentNode = currentNode.right;
			}
		}
	}

	delete(value, root = this.root) {
		if (root == null) {
			return root;
		}

		if (root.data > value) {
			root.left = this.delete(value, root.left);
		} else if (root.data < value) {
			root.right = this.delete(value, root.right);
		} else {
			if (root.left == null) {
				return root.right;
			} else if (root.right == null) {
				return root.left;
			}
			root.data = minValue(root);
			root.right = this.delete(root.right, root.data);
		}

		return root;
	}

	minValue(root) {
		let min;
		while (root != null) {
			min = root.data;
			root = root.left;
		}
		return min;
	}

	find(value, current = this.root) {
		if (!current) return null;
		if (current.data === value)
			//Log the return to test the function
			//return console.log(`${current.data} is in the tree`);
			return current;
		this.find(value, current.left);
		this.find(value, current.right);
	}

	//Returns the depth of a given node, root is level 0
	depth(value, node = this.root, level = 0) {
		if (!node) return 0;
		if (node.data === value)
			return console.log(`${value} is at level ${level}`);
		//if the value doesn't match goes down the left branch
		//and each step increments the level
		this.depth(value, node.left, (level += 1));
		//at the end of the least value in the left branch
		//the level is decreased before going down the right side
		level--;
		//if on the right side there is a node the level is increased
		this.depth(value, node.right, (level += 1));
	}

	//Traverse the tree breadth-first level oder (iterative)
	levelOrder(node = this.root) {
		if (!node) return null;
		let result = [];
		let queue = [node];
		while (queue.length > 0) {
			let firstValue = queue.shift();
			result.push(firstValue.data);
			if (firstValue.left) queue.push(firstValue.left);
			if (firstValue.right) queue.push(firstValue.right);
		}
		return result;
	}

	//Traverse the tree depth first in-order (recursive)
	inOrder(root = this.root) {
		if (!root) return [];
		let leftValues = this.inOrder(root.left);
		let rightValues = this.inOrder(root.right);
		return [...leftValues, root.data, ...rightValues];
	}

	//Traverse the tree depth first pre-order (recursive)
	preOrder(root = this.root) {
		if (!root) return [];
		let rootValue = [];
		rootValue.push(root.data);
		let leftValues = this.preOrder(root.left);
		let rightValues = this.preOrder(root.right);
		return [...rootValue, ...leftValues, ...rightValues];
	}

	//Traverse the tree depth first post-order
	postOrder(root = this.root) {
		if (!root) return [];
		let leftValues = this.postOrder(root.left);
		let rightValues = this.postOrder(root.right);
		let rootValue = [];
		rootValue.push(root.data);
		return [...leftValues, ...rightValues, ...rootValue];
	}
}

let sample = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const newTree = new Tree(sample);

newTree.prettyPrint();
newTree.delete(7);
newTree.prettyPrint();

let inOrder = newTree.inOrder();
console.log(inOrder);
let preOrder = newTree.preOrder();
console.log(preOrder);
let postOrder = newTree.postOrder();
console.log(postOrder);
let levelOrder = newTree.levelOrder();
console.log(levelOrder);

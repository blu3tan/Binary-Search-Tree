export default function mergeSort(data) {
	if (data.length == 1) return data;
	let midValue = Math.floor(data.length / 2);
	let leftSide = data.slice(0, midValue);
	let rightSide = data.slice(midValue);

	return merge(mergeSort(leftSide), mergeSort(rightSide));
}

function merge(left, right) {
	let result = [];
	while (left.length != 0 && right.length != 0) {
		if (left[0] <= right[0]) result.push(left.shift());
		else result.push(right.shift());
	}
	let merged = [...result, ...left, ...right];
	//The set method remove duplicates values
	return [...new Set(merged)];
}

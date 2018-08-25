"use strict";
let tempArr = [];
let sum = 10;
//tempArr.length = sum;
function generateRandomArr(arr, sum){
	//let collection = new Set;
	let firstHalfCollection = new Set;
	let secondHalfCollection = new Set;

	function createHalfCollection(collection, size){
		let randomDigit;
		while(collection.size < size ){
			//console.log('collection.size < sizeArr', collection.size < sizeArr);
			//console.log('collection.size ', collection.size );
			//console.log('collection ', collection );
			randomDigit = Math.floor(Math.random() * size + 1);
			//console.log('randomDigit ', randomDigit);
			collection.add(randomDigit);
		};
		console.log('collection', collection);
	};

	createHalfCollection(firstHalfCollection, sum/2);
	createHalfCollection(secondHalfCollection, sum/2);
	let iterator1 = firstHalfCollection.values();
	let iterator2 = secondHalfCollection.values();
	for(let i = 0; i < sum/2; i++){
		arr.push(iterator1.next().value);
		arr.push(iterator2.next().value);
	}
	console.log('arr', arr);
	// firstHalfCollection.forEach((el,ind)=>{
	// 	console.log('firstHalfCollection',el);
	// 	console.log('secondHalfCollection', secondHalfCollection.ind);
	// });
};
generateRandomArr(tempArr, sum);
// console.log();
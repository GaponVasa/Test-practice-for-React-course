"use strict";
const startData = {url : 'https://ec-test-react.herokuapp.com/api/v1/items',
		mainTag : document.querySelector('main'),
		startDiv : document.querySelector('.start'),
		fieldDiv : document.querySelector('.field'),
		resultDiv :document.querySelector('.result')};

class App {
	constructor(obj){
		this.url = obj.url,
		this.mainTag = obj.mainTag,
		this.startDiv = obj.startDiv,
		this.fieldDiv = obj.fieldDiv,
		this.resultDiv = obj.resultDiv,
		this.widthTable = 2,
		this.heightTable = 3,
		this.tempArray = [],
		this.state = {
			showFirstCard: false,
			allPair:0
		}
	};

	runFetch(){
		let	that = this;
		fetch(this.url, {method:'GET'})
			.then(response => {
				response.json().then(function(data){
					console.log('data', data); 
					that.widthTable = parseInt(data.width);
					that.heightTable = parseInt(data.height);
					console.log('(heightTable*widthTable)%2 !== 0', (that.heightTable*that.widthTable)%2 !== 0);
					console.log('heightTable*widthTable', that.heightTable*that.widthTable);
					console.log('heightTable', that.heightTable);
					console.log('widthTable', that.widthTable);
					if((that.heightTable*that.widthTable)%2 !== 0)that.runFetch();
				})
			})
			.catch(error => console.error('Error:', error));
	};

	setPreviousSettings(){
		this.fieldDiv.style.display = "none";
		this.resultDiv.style.display = "none";
	};

	generateRandomArr(arr, sum){
		let firstHalfCollection = new Set;
		let secondHalfCollection = new Set;
		function createHalfCollection(collection, size){
			let randomDigit;
			while(collection.size < size ){
				randomDigit = Math.floor(Math.random() * size + 1);
				collection.add(randomDigit);
			};
		};

		createHalfCollection(firstHalfCollection, sum/2);
		createHalfCollection(secondHalfCollection, sum/2);
		let iterator1 = firstHalfCollection.values();
		let iterator2 = secondHalfCollection.values();
		for(let i = 0; i < sum/2; i++){
			arr.push(iterator1.next().value);
			arr.push(iterator2.next().value);
		}
		return arr;
	};

	generateTable(width, height){
		let sum = width * height;
		let tableRows = "";
		let tableData = "";
		let tempArray = this.tempArray;
		//tempArray.length = sum;
		tempArray = this.generateRandomArr(tempArray, sum);
		for(let i = 0, count = 0; i < height; i++){
			for(let j = 0; j < width; j++){
				tableData = tableData + `<td ><div class="hide card">${tempArray[count]}</div></td>`;
				count++;
			};
			tableRows = tableRows + `<tr>${tableData}</tr>`;
			tableData = "";
		};
		document.getElementById("table").innerHTML = tableRows;
	};

	handlingEventClick(tagLink){
		tagLink.addEventListener('click', (e)=>{
			let target = e.target;
			if(target.classList.contains("btn")){
				this.startDiv.style.display = "none";
				this.generateTable(this.widthTable, this.heightTable);
				this.fieldDiv.style.display = "block";
			}else if(target.classList.contains("card")){
				console.log(target)
			}	
		});
	};


	start(){
		//console.log(this.url);
		this.runFetch();
		this.setPreviousSettings();
		this.handlingEventClick(this.mainTag);
	};
};

const runGame = new App(startData);
runGame.start();
"use strict";
const startData = {url : 'https://ec-test-react.herokuapp.com/api/v1/items',
		mainTag : document.querySelector('main'),
		startDiv : document.querySelector('.start'),
		fieldDiv : document.querySelector('.field'),
		resultDiv :document.querySelector('.result')};

class App {
	constructor(objstartData){
		this.url = objstartData.url,
		this.mainTag = objstartData.mainTag,
		this.startDiv = objstartData.startDiv,
		this.fieldDiv = objstartData.fieldDiv,
		this.resultDiv = objstartData.resultDiv,
		this.widthTable = 2,
		this.heightTable = 3,
		this.tempArray = [],
		this.state = {
			showFirstCard: false,
			showSecondCard: false,
			linkToFirstCard:null,
			allPair:0
		}
	};

	runFetch(){
		let	that = this;
		fetch(this.url, {method:'GET'})
			.then(response => {
				response.json().then(function(data){
					that.widthTable = parseInt(data.width);
					that.heightTable = parseInt(data.height);
					if((that.heightTable*that.widthTable)%2 !== 0)that.runFetch();
				})
			})
			.catch(error => console.error('Error:', error));
	};

	setPreviousSettings(){
		this.fieldDiv.style.display = "none";
		this.resultDiv.style.display = "none";
	};

	hideShowCard(targetElement){
		targetElement.classList.toggle("hide");
		targetElement.classList.toggle("show");
	};

	generateRandomArr(arr, sum){
		let firstHalfCollection = new Set;
		let secondHalfCollection = new Set;
		let halfSum = sum/2;
		this.state.allPair = halfSum;
		function createHalfCollection(collection, size){
			let randomDigit;
			while(collection.size < size ){
				randomDigit = Math.floor(Math.random() * size + 1);
				collection.add(randomDigit);
			};
		};

		createHalfCollection(firstHalfCollection, halfSum);
		createHalfCollection(secondHalfCollection, halfSum);
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
		tempArray = this.generateRandomArr(tempArray, sum);
		for(let i = 0, count = 0; i < height; i++){
			for(let j = 0; j < width; j++){
				tableData = tableData + `<td ><div class="card hide">${tempArray[count]}</div></td>`;
				count++;
			};
			tableRows += `<tr>${tableData}</tr>`;
			tableData = "";
		};
		document.getElementById("table").innerHTML = tableRows;
	};

	stopGame(){
		this.fieldDiv.style.display = "none";
		this.resultDiv.style.display = "flex";
	}

	handlingClicOnCard(targetElement){
		let {showFirstCard, showSecondCard, linkToFirstCard}  = this.state;
		let firstDigit, secondDigit; 

		if(showFirstCard === false){
			this.state.showFirstCard = true;
			this.state.linkToFirstCard = targetElement;
			this.hideShowCard(targetElement);
		}else if(showFirstCard === true && showSecondCard === false){
			firstDigit = parseInt(linkToFirstCard.innerHTML);
			secondDigit = parseInt(targetElement.innerHTML);
			this.state.showSecondCard = true;
			this.hideShowCard(targetElement);
			if(firstDigit === secondDigit){
				
				setTimeout(function(){
					targetElement.classList.remove("hide", "show");
					linkToFirstCard.classList.remove("hide", "show");
					targetElement.classList.add("gray");
					linkToFirstCard.classList.add("gray");
					this.state.showFirstCard = false;
					this.state.showSecondCard = false;
					this.state.allPair--;
					if(this.state.allPair === 0)this.stopGame();
				}.bind(this),500);
			}else{

				setTimeout(function(){
					this.hideShowCard(targetElement);
					this.hideShowCard(linkToFirstCard);
					this.state.showFirstCard = false;
					this.state.showSecondCard = false;
				}.bind(this),1000);
			}
		}
	}

	handlingEventClick(tagLink){
		let {showSecondCard} = this.state;
		tagLink.addEventListener('click', (e)=>{
			let target = e.target;
			let existBtnClass = target.classList.contains("btn");
			let existCardClass = target.classList.contains("card");
			let existHideClass = target.classList.contains("hide");
			if(existBtnClass){
				this.startDiv.style.display = "none";
				this.generateTable(this.widthTable, this.heightTable);
				this.fieldDiv.style.display = "block";
			}else if(existCardClass && existHideClass && !showSecondCard){
				this.handlingClicOnCard(target);
			};
		});
	};

	start(){
		this.runFetch();
		this.setPreviousSettings();
		this.handlingEventClick(this.mainTag);
	};
};

const runGame = new App(startData);
runGame.start();
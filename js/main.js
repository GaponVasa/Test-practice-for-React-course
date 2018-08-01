"use strict";
(function(){
	const url1 = 'https://ec-test-react.herokuapp.com/api/v1/items',
		mainTag = document.querySelector('main'),
		start = document.querySelector('.start'),
		fieldDiv = document.querySelector('.field'),
		resultDiv = document.querySelector('.result');

	let sizeField,
		widthArray = 2,
		heightArray = 3,
		tempArray = [],
		pair = 0;

	let runPromise1 = ()=>{
		let promise1 = XMLHttp.send(url1);
		promise1.then((result)=>{
			sizeField = result;
			let obj = JSON.parse(sizeField);
			widthArray = obj.width;
			heightArray = obj.height;
			if((heightArray*widthArray)%2 !== 0){
				runPromise1();
			}
		});
	};

	const setPreviousSettings = ()=>{
		fieldDiv.style.display = "none";
		resultDiv.style.display = "none";
	};

	const randomArr = (arr, sum)=>{
		let pair = 1;
		let tmpDigit = sum/2 ;
		let flag = true;
		let length = arr.length;
		let rnd;

		for(let i = 0; i < length; i++){
			while(flag){
				rnd = Math.floor(Math.random() * length);
				if(arr[rnd] === undefined){
					arr[rnd] = tmpDigit;
					flag = false;
				};
			};
			if(pair%2 === 0){tmpDigit--};
			pair++;
			flag = true;
		};
		return arr;
	};

	const generateBlockArray =(width, height)=>{
		let sum = width * height;
		let table = "";
		tempArray.length = sum;
		tempArray = randomArr(tempArray, sum);

		for(let i = 0, count = 0; i < height; i++){
			table = table + "<tr>";
			for(let j = 0; j < width; j++){
				table = table + `<td class="hide">${tempArray[count]}</td>`;
				count++;
			};
			table = table + "</tr>";
		};
		document.getElementById("table").innerHTML = table;
	};

	const hideShowTd = (targEl)=>{
		targEl.classList.toggle("hide");
		targEl.classList.toggle("show");
	};

	const deleteHideShowTd = (targEls)=>{
		let arr = ["hide", "show"];
		targEls.forEach(el=>{
			arr.forEach(el1=>{
				if(el.classList.contains(el1)){
					el.classList.remove(el1);
				};
			});
		});
	};

	const game = (div)=>{
		let prevTargetEl = null;
		let arrTimers = [];
		let quantityPairs;
		let coincidence = 0;

		div.addEventListener('click', (e)=>{
			let target = e.target;
			if(target.tagName === "TD"){
				if(!target.hasOwnProperty('opened')){
					target.opened = false;
				};
			};
			if(target.classList.contains("btn")){
				start.style.display = "none";
				generateBlockArray(widthArray, heightArray)
				fieldDiv.style.display = "block";
			}else if(target.classList.contains("hide") && !target.opened && (arrTimers.length < 2)){
				target.opened = true;
				hideShowTd(target);

				setTimeout(()=>{
					if(!target.classList.contains("gray")){
						hideShowTd(target);
					};
					arrTimers.pop();
					target.opened = false;
				}, 2000);
				arrTimers.push(1);
				

				if(prevTargetEl !== null){
					if(prevTargetEl.innerHTML === target.innerHTML && prevTargetEl.opened){
						quantityPairs = (widthArray*heightArray)/2;
						deleteHideShowTd([prevTargetEl, target]);
						prevTargetEl.classList.toggle("gray");
						target.classList.toggle("gray");
						arrTimers.length = 0;
						if(quantityPairs - 1 > coincidence){
							coincidence++;
						}else{
							fieldDiv.style.display = "none";
							resultDiv.style.display = "flex";
						}
					};
				};

				prevTargetEl = target;
				prevTargetEl.opened = true;
			};
		});
	};

	runPromise1();
	setPreviousSettings();
	game(mainTag);

})();
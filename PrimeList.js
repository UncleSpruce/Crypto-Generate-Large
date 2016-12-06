function PrimeList(pSize){
	this.lclArrayOfPrimes = [2];
	var lclTestValue = 3;
	
	var fHasMultipleInList = function(pTest, pList){
		for (var i = 0; i < pList.length; i++){
			if (pTest % pList[i] === 0){
				return true;
			}
		}
		return false;
	};
	
	while (this.lclArrayOfPrimes.length < pSize){
		if (!fHasMultipleInList(lclTestValue, this.lclArrayOfPrimes)){
			this.lclArrayOfPrimes.push(lclTestValue);
		}
		lclTestValue++;
	}
};

PrimeList.prototype.getPrimeList = function(){
	return this.lclArrayOfPrimes;
};

PrimeList.prototype.getNumberCoprimeWithList = function(pLowerBound, pTimeOut){
	var lclModDifference = bigInt(pLowerBound).mod(bigInt(this.product()));
	var lclReturnValue = bigInt(pLowerBound).minus(bigInt(lclModDifference)).add(bigInt(this.product()));
	
	var lclNumberToAdd = bigInt(1);
	return  lclReturnValue.add(lclNumberToAdd);
	//var lclProduct = bigInt(this.product).mod()
	/*
	var lclDateStart = new Date();
	var lclStartTime = lclDateStart.getTime();
	
	//pLowerBound is assumed to be of bigInt type				
	var lclReturnValue = bigInt(pLowerBound);
	var lclIndexOfPrimeArray = 0;
	var lclGrandFactor = bigInt(1);
	while (lclIndexOfPrimeArray < this.lclArrayOfPrimes.length){
		while (lclReturnValue.mod(bigInt(this.lclArrayOfPrimes[lclIndexOfPrimeArray])).equals(bigInt(0))){
			lclReturnValue = lclReturnValue.add(lclGrandFactor); //This loop should only ever run once for each pass.
			
			var lclDateNow = new Date();
			var lclTimeNow = lclDateNow.getTime();
			if (lclStartTime + pTimeOut < lclTimeNow){
				return -1; //Return -1 in the event of a timeout
			}
		}
		lclGrandFactor = lclGrandFactor.multiply(bigInt(this.lclArrayOfPrimes[lclIndexOfPrimeArray]));
		lclIndexOfPrimeArray++;
		//alert(lclReturnValue);
	}
	*/
	return lclReturnValue;
};

PrimeList.prototype.product = function(){
	var lclProduct = bigInt(1);
	for (var i = 0; i < this.lclArrayOfPrimes.length; i++){
		lclProduct = lclProduct.multiply(this.lclArrayOfPrimes[i]);
	}
	return lclProduct;
};

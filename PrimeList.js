function PrimeList(pSize){
	this.lclArrayOfPrimes = [2];
	var lclTestValue = 3;
	
	var fHasMultipleInList = function(pTest, pList){
		for (var i = 0; i < pList.length; i++){
			if (pTest % pList[i] = 0){
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

PrimeList.prototype.getNumberCoprimeWithList = function(pLowerBound){
	//pLowerBound is assumed to be of bigInt type				
	var lclReturnValue = bigInt(pLowerBound);
	var lclIndexOfPrimeArray = 0;
	var lclGrandFactor = bigInt(1);
	while (lclIndexOfPrimeArray < this.lclArrayOfPrimes.length){
		while (lclReturnValue % this.lclArrayOfPrimes[lclIndexOfPrimeArray] === 0){
			pReturnValue += lclGrandFactor; //This loop should only ever run once for each pass.
		}
		lclGrandFactor = lclGrandFactor.multiply(bigInt(this.lclArrayOfPrimes[lclIndexOfPrimeArray]));
		lclIndexOfPrimeArray++;
	}
	return lclReturnValue;
};

var lclPL = PrimeList(10);
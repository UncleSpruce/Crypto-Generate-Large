var fGenerateBigInt = function(pSize){
	var lclGeneratedNumber = bigInt();
	var lclRPrecision = pSize;
	var lclRArray = new Uint32Array(lclRPrecision);
	window.crypto.getRandomValues(lclRArray);

	for (var i = 0; i < lclRArray.length; i++){
		lclGeneratedNumber = lclGeneratedNumber.add(bigInt(2).pow(32).pow(i).multiply(bigInt(lclRArray[i])));
	}
	
	return lclGeneratedNumber;
};

var fGenerateBigLimitedInt = function(pLowerLimit, pUpperLimit){
	// Returns x: pLowerLimit <= x < pUpperLimit
	var lclSizeOfGenerator = 0;
	var lclRange = bigInt(pUpperLimit - pLowerLimit);
	while (bigInt(2).pow(32 * lclSizeOfGenerator).lesserOrEquals(lclRange)){
		lclSizeOfGenerator++;
	};
	console.log(lclSizeOfGenerator)
	return fGenerateBigInt(lclSizeOfGenerator).mod(lclRange).add(pLowerLimit);
};

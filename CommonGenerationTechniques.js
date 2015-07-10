var yourPL = new PrimeList(20);

var fGenerateCoprime = function(pLowerLimit, pUpperLimit, pTarget){
	var lclTest = fGenerateBigLimitedInt(pLowerLimit, pUpperLimit);
	while (bigInt.gcd(bigInt(lclTest),bigInt(pTarget)).neq(1)){
		lclTest = fGenerateBigLimitedInt(pLowerLimit, pUpperLimit);
	}
	return lclTest;
}

var fGenerateMassiveSecureInteger = function(){
	return yourPL.getNumberCoprimeWithList(fGenerateBigInt(10), 20);
}

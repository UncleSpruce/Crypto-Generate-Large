

var fGenerateLargePrime = function(pPrimeList, pLowerBound, pTimeOut){
	 var lclStartDate = new Date();
	 var lclStartTime = lclStartDate.getTime();
	 
	 var lclReturnValue = pPrimeList.getNumberCoprimeWithList(pLowerBound);
	 while(true){
		
		
		if (lclReturnValue.isPrime()) {
			break;
		} else {
			var lclDateNow = new Date();
			var lclTimeNow = lclDateNow.getTime();
			lclReturnValue = bigInt(pPrimeList.getNumberCoprimeWithList(lclReturnValue + 2, pTimeOut - lclTimeNow + lclStartTime));
		}
		
		var lclDateNow = new Date();
		var lclTimeNow = lclDateNow.getTime();
		if (lclStartTime + pTimeOut < lclTimeNow || lclReturnValue === -1){
			return -1;
		}
	}
	return lclReturnValue;
}

var fGenerateLargePrimeWithMultipleAttempts = function(pLowerBound, pTimeOut){
	var lclStartDate = new Date();
	var lclStartTime = lclStartDate.getTime();
	var yourPL = new PrimeList(5);
	
	while (true){
		var lclDateNow = new Date();
		var lclTimeNow = lclDateNow.getTime();
		if (lclTimeNow > lclStartTime + pTimeOut){
			return -1;
		}
		
		var lclNumberGenerated = bigInt(fGenerateLargePrime(yourPL, pLowerBound, Math.min(30, pTimeOut - lclTimeNow + lclStartTime)));
		if (lclNumberGenerated.neq(bigInt(-1)))
			return lclNumberGenerated;
	}
}

var fGenerateCoprime = function(pLowerLimit, pUpperLimit, pTarget){
	var lclTest = fGenerateBigLimitedInt(pLowerLimit, pUpperLimit);
	while (bigInt.gcd(bigInt(lclTest),bigInt(pTarget)).neq(1)){
		lclTest = fGenerateBigLimitedInt(pLowerLimit, pUpperLimit);
	}
	return lclTest;
}

var yourPL = new PrimeList(20);

var fGenerateMassiveSecureInteger = function(){
	
	return yourPL.getNumberCoprimeWithList(fGenerateBigInt(10), 20);
}

var robinson = fGenerateLargePrimeWithMultipleAttempts(fGenerateBigInt(1), 1000);
if (bigInt(robinson).eq(bigInt(-1))){
	throw "Too Big";
}

$("#GenerateButton").click(function(){
	//try {
		//var robinson = fGenerateLargePrimeWithMultipleAttempts(fGenerateBigInt(1), 5000);
		var lclModulus = bigInt(fGenerateMassiveSecureInteger());
		var lclExp1 = bigInt(fGenerateCoprime(lclModulus.divide(6), lclModulus.divide(6).multiply(5), lclModulus));
		var lclExp2 = bigInt(fGenerateCoprime(lclModulus.divide(6), lclModulus.divide(6).multiply(5), lclModulus));
		var lclComputedValue = bigInt(2).modPow(lclExp1, lclModulus).modPow(lclExp2, lclModulus);
		
		var lclBox1Value = $("#Box1").val();
		var lclBox2Value = $("#Box2").val();
		var lclBox3Value = $("#Box3").val();
		
		var lclDifference1 = lclExp1.minus(lclBox1Value);
		var lclDifference2 = lclExp2.minus(lclBox2Value);
		var lclDifferenceComputedValue = bigInt(lclBox3Value).minus(lclComputedValue);
		
		var lclTextBodyString = "";
		lclTextBodyString += "Modulus: \n" + lclModulus.toString() + "\n";
		lclTextBodyString += "Exponent1: \n" + lclExp1.toString() + "\n";
		lclTextBodyString += "Exponent2: \n" + lclExp2.toString() + "\n";
		lclTextBodyString += "First Difference: \n" + lclDifference1.toString() + "\n"
		lclTextBodyString += "Second Difference: \n" + lclDifference2.toString() + "\n"
		lclTextBodyString += "Result Difference: \n" + lclDifferenceComputedValue.toString() + "\n"
		
		$("#Box1").val(lclModulus);
		$("#Box2").val(lclExp1);
		$("#Box3").val(lclExp2);
		
		$("#bodykey").text(lclTextBodyString);
		/*
		if (bigInt.gcd(lclModulus,lclExp1).eq()){
			
		}
		*/
		//alert(bigInt.gcd(lclModulus,lclExp2));
		
		//$("#Box2").val(robinson.isPrime());
		//$("#Box3").val(robinson);
	//}
	//catch(err){
	//	console.log(err.message);
	//}
});

$("#KillButton").click(function(){
	
})

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
		var lclExp1 = bigInt(fGenerateCoprime(lclModulus.divide(6), lclModulus.divide(6).multiply(5), lclModulus - 1));
		var lclExp2 = bigInt(fGenerateCoprime(lclModulus.divide(6), lclModulus.divide(6).multiply(5), lclModulus - 1));
		var lclComputedValue = bigInt(2).modPow(lclExp1, lclModulus).modPow(lclExp2, lclModulus);
		
		//console.log(lclModulus);
		
		var lclBox1Value = $("#Box1").val();
		var lclBox2Value = $("#Box2").val();
		var lclBox3Value = $("#Box3").val();
		
		var lclDifference1 = lclExp1.minus(lclBox1Value);
		var lclDifference2 = lclExp2.minus(lclBox2Value);
		var lclDifferenceComputedValue = lclComputedValue.minus(bigInt(lclBox3Value));
		
		var lclJSONKey = {};
		lclJSONKey.difference1 = lclDifference1.toString();
		lclJSONKey.difference2 = lclDifference2.toString();
		lclJSONKey.differenceComputed = lclDifferenceComputedValue.toString();
		lclJSONKey.modulus = lclModulus.toString();
		
		
		
		var lclTextBodyString = "";
		lclTextBodyString += "Modulus: \n" + lclModulus.toString() + "\n";
		//lclTextBodyString += "Exponent1: \n" + lclExp1.toString() + "\n";
		//lclTextBodyString += "Exponent2: \n" + lclExp2.toString() + "\n";
		lclTextBodyString += "First Difference: \n" + lclDifference1.toString() + "\n"
		lclTextBodyString += "Second Difference: \n" + lclDifference2.toString() + "\n"
		lclTextBodyString += "Result Difference: \n" + lclDifferenceComputedValue.toString() + "\n"
		
		//$("#Box1").val(lclModulus);
		//$("#Box2").val(lclExp1);
		//$("#Box3").val(lclExp2);
		
		$("#JSONBox").val(JSON.stringify(lclJSONKey));
		
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

//{"difference1":"131056206551453953733638905463799796545069508805298831700022539120432230128427614993756241103938","difference2":"133254303321743883861412031538770523355438191010406295294594037619038797520828028510384127027175","differenceComputed":"457487111938244019376492991209348633725063126495214029811895091981430106510009989592723867464817","modulus":"720216716749452781089081767306227138129564617261410430708014956725405996941886488941740450294121"}

$("#RecoverButton").click(function(){
	var lclJsonKey = JSON.parse($("#JSONBox").val());
	var lclBox1Value = bigInt($("#Box1").val());
	var lclBox2Value = bigInt($("#Box2").val());
	
	var lclModulus = bigInt(lclJsonKey.modulus);
	var lclDifferenceComputed = bigInt(lclJsonKey.differenceComputed);
	
	var lclTemp1 = bigInt(lclJsonKey.difference1);
	var lclExp1Value = lclBox1Value.add(lclTemp1);
	
	var lclTemp2 = bigInt(lclJsonKey.difference2);
	var lclExp2Value = lclBox2Value.add(lclTemp2);
	
	var lclProductOfExponents = lclExp2Value.times(lclExp1Value);
	
	var lclResultingValue = bigInt(2).modPow(lclProductOfExponents, lclModulus).minus(lclDifferenceComputed);
	//bigInt(2).modPow(bigInt("140914842424436550576872207564091942058388047862146143591191326053888139590378243849497810151351").multiply(bigInt("155119547283960973161665492920987967330606485705855107370238891310992632902140708697193062991384")), bigInt("669464475190260933687266877919394352075981361763163037643428962739635989714852023477727143437571")).minus(bigInt("-11715531813712705254573737473044954269738377258393273655260629244933475088389428181658261086857"));
	
	console.log("Product of Exponents");
	console.log(lclProductOfExponents.toString());
	console.log(lclTemp2, lclTemp1, lclExp1Value, lclExp1Value, lclResultingValue, lclModulus, lclDifferenceComputed, lclBox2Value, lclBox1Value);
	
	
	/*
	console.log(lclJsonKey);
	
	var lclTemp;
	console.log(lclBox1Value);
	
	console.log(lclBox2Value);
	
	console.log(lclTemp);
	
	console.log(lclExp1Value);
	lclTemp = bigInt(lclJsonKey.difference2)
	console.log(lclTemp);
	
	console.log(lclExp2Value);
	
	console.log(lclModulus);
	
	console.log(lclResultingValue);
	*/
	$("#Box3").val(lclResultingValue);
	
})

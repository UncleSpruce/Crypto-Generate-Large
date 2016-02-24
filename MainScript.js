$("#GenerateButton").click(function(){
	var lclJsonKey = fGetJsonKey();
	
	/*
	var lclTextBodyString = "";
	lclTextBodyString += "Modulus: \n" + lclJsonKey.modulus + "\n";
	
	lclTextBodyString += "First Difference: \n" + lclJsonKey.difference1 + "\n"
	lclTextBodyString += "Second Difference: \n" + lclJsonKey.difference2 + "\n"
	lclTextBodyString += "Result Difference: \n" + lclJsonKey.differenceComputed + "\n"
	
	$("#bodykey").text(lclTextBodyString);
	*/
	$("#JSONBox").val(JSON.stringify(lclJsonKey));
});

var fConvertStringToInt = function(strArg){	
	var lclCharArray = strArg.split('');
	var lclIntSum = bigInt();
	for (i = 0; i < lclCharArray.length; i++) { 
		lclIntSum = bigInt(lclCharArray[i].charCodeAt(0)).multiply(bigInt(256).pow(i)).add(lclIntSum);
	}
	return lclIntSum;
	//"a".charCodeAt(0)
};

var fConvertIntToString = function(intArg){
	// This assumes that intArg is a bigInt type.
	var lclInt = intArg;
	var lclCharArray = [];
	while (lclInt > 0) {
		console.log(lclInt);
		var lclModValue = lclInt.mod(256).valueOf();
		console.log(lclModValue);
		var lclDesiredChar = String.fromCharCode(lclModValue); // The character to push onto the end of the array
		console.log(lclDesiredChar);
		lclCharArray.push(lclDesiredChar);
		lclInt = lclInt.minus(lclInt.mod(256));
		console.log(lclInt);
		lclInt = lclInt.divide(256);
		console.log(lclInt);
	}		
	return lclCharArray.join("");
}

var fLoopConversionTest = function(lclIntArg){
	var lclStrArg = "";
	var lclInt = bigInt(lclIntArg);
	lclStrArg = fConvertIntToString(lclInt);
	var lclFinalInt = fConvertStringToInt(lclStrArg);
	if (bigInt(lclFinalInt) != bigInt(lclIntArg)){
		throw new Error("Either fConvertStringToInt or fConvertIntToString does not work properly with final int being. " + lclFinalInt);
	}
	return lclFinalInt;
}

var fComputeTheJsonKeyResults = function(){
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
	
	$("#Box3").val(lclResultingValue);
};

$("#RecoverButton").click(function(){
	fComputeTheJsonKeyResults();
})


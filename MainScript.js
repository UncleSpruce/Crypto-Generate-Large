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
	var lclBox1Value = bigInt(fConvertStringToInt($("#Box1").val()));
	var lclBox2Value = bigInt(fConvertStringToInt($("#Box2").val()));
	
	var lclModulus = bigInt(lclJsonKey.modulus);
	var lclDifferenceComputed = bigInt(lclJsonKey.differenceComputed);
	
	var lclTemp1 = bigInt(lclJsonKey.difference1);
	var lclExp1Value = lclBox1Value.add(lclTemp1);
	
	var lclTemp2 = bigInt(lclJsonKey.difference2);
	var lclExp2Value = lclBox2Value.add(lclTemp2);
	
	var lclProductOfExponents = lclExp2Value.times(lclExp1Value);
	
	var lclResultingValue = bigInt(2).modPow(lclProductOfExponents, lclModulus).minus(lclDifferenceComputed);
	
	$("#Box3").val(fConvertIntToString(lclResultingValue));
};

$("#RecoverButton").click(function(){
	fComputeTheJsonKeyResults();
})

$("#Box2").attr("disabled", "disabled");

var jsonStartKey = {"difference1":"252030116035006600776395395444433593692141238851688690727061841591426715942610339846934831366323","difference2":"795785617197004648125849476301211012775667050010987624611987158692853580889380506663984156301951","differenceComputed":"-7200609561788965114429501527697469980788502143580422493914158600148558706389885311583966975369447640536201255041264814368715115820210607112676371022325060774713341311306864700227720981157188","modulus":"1121873667562188999481071494757476413224004687019209899605606404681343465907973169786784682009981"}
$('#JSONBox').val(JSON.stringify(jsonStartKey));
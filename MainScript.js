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

var fGetJsonKey = function(){
	var lclModulus = bigInt(fGenerateMassiveSecureInteger());
	var lclExp1 = bigInt(fGenerateCoprime(lclModulus.divide(6), lclModulus.divide(6).multiply(5), lclModulus - 1));
	var lclExp2 = bigInt(fGenerateCoprime(lclModulus.divide(6), lclModulus.divide(6).multiply(5), lclModulus - 1));
	var lclComputedValue = bigInt(2).modPow(lclExp1, lclModulus).modPow(lclExp2, lclModulus);
	
	var lclBox1Value = fConvertStringToInt($("#Box1").val());
	var lclBox2Value = fConvertStringToInt($("#Box2").val());
	var lclBox3Value = fConvertStringToInt($("#Box3").val());
	
	var lclDifference1 = lclExp1.minus(lclBox1Value);
	var lclDifference2 = lclExp2.minus(lclBox2Value);
	var lclDifferenceComputedValue = lclComputedValue.minus(bigInt(lclBox3Value));
	
	var lclJSONKey = {};
	lclJSONKey.difference1 = lclDifference1.toString();
	lclJSONKey.difference2 = lclDifference2.toString();
	lclJSONKey.differenceComputed = lclDifferenceComputedValue.toString();
	lclJSONKey.modulus = lclModulus.toString();
	return lclJSONKey;
};
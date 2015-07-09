var yourPL = new PrimeList(10);
var robinson = yourPL.getNumberCoprimeWithList(5000);
console.log(robinson);

//alert(yourPL.product());


//alert();


//var forge = require('node-forge');
//var BigInteger = forge.jsbn.BigInteger;

// primes are 30k+i for i = 1, 7, 11, 13, 17, 19, 23, 29

/*
var GCD_30_DELTA = [6, 4, 2, 4, 2, 4, 6, 2];
var THIRTY = new BigInteger(null);
THIRTY.fromInt(30);

// generate random BigInteger
var num = generateRandom(4096);

// find prime nearest to random number
findPrime(num, function(num) {
  console.log('random', num.toString(16));
});


function generateRandom(bits) {
  var rng = {
	// x is an array to fill with bytes
	nextBytes: function(x) {
	  var b = forge.random.getBytes(x.length);
	  for(var i = 0; i < x.length; ++i) {
		x[i] = b.charCodeAt(i);
	  }
	}
  };
  var num = new BigInteger(bits, rng);

  // force MSB set
  var bits1 = bits - 1;
  if(!num.testBit(bits1)) {
	var op_or = function(x,y) {return x|y;};
	num.bitwiseTo(BigInteger.ONE.shiftLeft(bits1), op_or, num);
  }

  // align number on 30k+1 boundary
  num.dAddOffset(31 - num.mod(THIRTY).byteValue(), 0);

  return num;
}

function findPrime(num, callback) {
  /* Note: All primes are of the form 30k+i for i < 30 and gcd(30, i)=1. The
  number we are given is always aligned at 30k + 1. Each time the number is
  determined not to be prime we add to get to the next 'i', eg: if the number
  was at 30k + 1 we add 6. */
  var deltaIdx = 0;

  // find prime nearest to 'num' for 100ms
  var start = Date.now();
  while(Date.now() - start < 100) {
	// do primality test (only 2 iterations assumes at
	// least 1251 bits for num)
	if(num.isProbablePrime(2)) {
	  return callback(num);
	}
	// get next potential prime
	num.dAddOffset(GCD_30_DELTA[deltaIdx++ % 8], 0);
  }

  // keep trying (setImmediate would be better here)
  setTimeout(function() {
	findPrime(num, callback);
  });
}



var zero = bigRat();
var threeFourths = bigRat(0.75);
var fiveHalves = bigRat("5/2");
$("#TheButton").click(function(){
	$("#Box1").val(fGenerateBigLimitedInt(1, 4));

});


/*
var fMillerRabinIsComposite = function(pTestNumber, pNumberOfTests){
	// The miller Rabin Primality Test.
	
	//if (pTestNumber < 3){
	//	console.log("Warning: " + pTestNumber + " is not 3 or greater in fMillerRabinIsComposite Test.");
	//}
	var lclPARs = 0;
	var lclPARd = pTestNumber.minus(1);
	while (lclTempNumber.mod(2).equals(0)){
		lclPARs++;
		lclPARd = lclPARd.divide(2);
	};
	
	
	
	for (var i = 0; i < pNumberOfTests; i++){
		var lclRandomNumber = fGenerateBigLimitedInt(2, pTestNumber - 2);
		var lclPARx = lclRandomNumber.pow(lclPARd).mod(pTestNumber);
		if (lclPARx.equals(1) || lclPARx.equals(pTestNumber.minus(1))){
		
		} else {
			for (var j = 0; j < lclPARs - 1; j++){
				lclPARx = lclPARx.square().mod(pTestNumber);
				if (lclPARx.square 
			}
		}
	
	}
	return false;
}
*/
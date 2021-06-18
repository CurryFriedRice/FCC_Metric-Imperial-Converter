function ConvertHandler() {
  //The initial number
  this.getNum = function(input) {
    let result;
    /*
    if(input.includes("/")){
      let splitNums = input.split("/");
      //console.log(splitNums.length);
      if(splitNums.length <= 2) result = Number(splitNums[0]) / Number(splitNums[1]);
      else result = "invalid number";
    }else if(!isNaN(input)){result = input;}
    else{
      result = Number(input);
    }
    */
    result = input; 
    //console.log(result + " | " + typeof result);
    if(result.length == 0){
      result = 1;
    }
    else if(result.includes('/'))
    {
      let splitNums = input.split('/');
      if(splitNums.length <= 2) result = Number(splitNums[0]) / Number(splitNums[1]);
      else result = "invalid number";
    }
    else{
      result = Number(result);
    }

    //console.log(result + " | " + typeof result);
    //console.log(input);
    return result;
  };

  //The unit that we're passing in... to log it 
  this.getUnit = function(input) {
    let result;
    //console.log("CH: 2 Getting Unit");
    switch(input.toLowerCase()){
      case "l":
        result = "L";
        break;
      case 'lbs':
      case 'lb':
      case 'gal':
      case 'mi':
      case 'kg':
      case 'km':
        result = input.toLowerCase();
        break;
      default:
        result = "invalid unit";
        break;
    }
    return result;
  };

  this.getReturnUnit = function(initUnit) {
    let result;
    //console.log("CH: X Get Return Unit");
    switch (initUnit.toLowerCase()) {
      //Imperial to Metric
      case 'lb':
      case 'lbs':
        result =  'kg';
        break;
      case 'gal':
        result = 'L';
        break;
      case 'mi':
        result =  'km';
        break;
      
      //Metric to Imperial
      case 'kg':
        result = 'lbs';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'km':
        result =  'mi';
        break;
      default:
        //console.log("invalid Unit");
        result = "invalid unit";
        break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    //console.log("CH: X Spelling Out Unit");
    switch (unit.toLowerCase()) {
      case 'lbs':
        result =  'pounds' ;
        break;
      case 'gal':
        result = 'gallons';
        break;
      case 'mi':
        result =  'miles' ;
        break;
      case 'kg':
        result =  'kilograms' ;
        break;
      case 'l':
        result =  'Liters';
        break;
      case 'km':
        result =  'kilometers';
        break;
      default:
        result = "invalid unit";
        break;
    }
    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result = Number(initNum);
    //console.log("CH: X Converting Unit");
    switch(initUnit.toLowerCase()){

      case 'lbs':
        result *= lbsToKg;
        break;
      case 'gal':
        result *= galToL;
        break;
      case 'mi':
        result *= miToKm;
        break;
      case 'kg':
        result /= lbsToKg;
        break;
      case 'l':
        result /= galToL;
        break;
      case 'km':
        result /= miToKm;
        break;
      default:
        
        break;
    
    };

    return Number(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    //console.log("CH: X Getting String");
    result = initNum + " " + this.spellOutUnit(initUnit) +  " converts to " + returnNum + " " +  this.spellOutUnit(returnUnit);
    return result;
  };


}

module.exports = ConvertHandler;

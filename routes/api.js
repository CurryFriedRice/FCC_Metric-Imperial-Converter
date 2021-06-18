'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  
  //console.log("Hello!");
  //console.log(app.param);
  app.route("/api/convert/").get(function(req,res) 
    {
      let regex;
      //console.log(req.query.input);
      let substring = req.query.input;
      //console.log("1: " + substring);
      //let regex = new RegExp("a-zA-Z");
      let invalidNum = false;
      let invalidUnit = false;
      //letter regex ([A-Z])\w      
      regex = /([a-zA-Z])+/g;
      let unit = regex.exec(substring)[0];
      //console.log("4: " + unit);
      //console.log(convertHandler.getUnit(unit) == "invalid unit");
      if(convertHandler.getUnit(unit) == "invalid unit") invalidUnit = true;
      //console.log("2: " + regex);
      
      
      regex = /([0-9./])+/g;
      //console.log(substring.match(regex) == null);
      let number;
      
      if(substring.match(regex) == null) number = "";
      else{
        number = regex.exec(substring)[0];//(number === undefined) number = 1;
        //console.log(typeof number);
        if(convertHandler.getNum(number) == "invalid number") invalidNum = true;
      }
      //console.log(substring.match(regex) == null);
      //console.log("3: " + number);

      //console.log("attempting Making a Json response");
      //console.log(invalidUnit + "and" + invalidNum);
      if(invalidUnit==true || invalidNum==true){
        //console.log("Error: Invalid Value");
        if(invalidUnit == true &&  invalidNum == true) res.send("invalid number and unit");
        else if(invalidNum==true)   res.send("invalid number");
        else if(invalidUnit==true)  res.send("invalid unit");
      }else{
        let response = 
        {
          initNum: convertHandler.getNum(number), 
          initUnit: convertHandler.getUnit(unit), 
          returnNum: convertHandler.convert(convertHandler.getNum(number), unit),
          returnUnit:  convertHandler.getReturnUnit(unit) , 
          string: convertHandler.getString(number, unit, convertHandler.convert(convertHandler.getNum(number), unit),convertHandler.getReturnUnit(unit))
        };
      
        //console.log(response);
        res.json(response);
      }
    });

  
};

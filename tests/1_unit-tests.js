const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test("convertHandler Whole Number Input", function(){
    assert.isNumber(convertHandler.getNum("5"), "Input is not a number");
    assert.isNumber(convertHandler.getNum("29"), "Input is not a number");
  });

  test("converHandler Decimal Point Input", function(){
    assert.isNumber(convertHandler.getNum("5.3"), "Decimal Input did not work");
    assert.isNumber(convertHandler.getNum("6.9"), "Decimal Input did not work");
    assert.isNumber(convertHandler.getNum("0.9"), "Decimal Input did not work");
    assert.isNumber(convertHandler.getNum(".9"), "Input is not a number");
  });

  test("convertHandler Fraction Input",function(){
    assert.isNumber(convertHandler.getNum("5/2"), "Input is not a number");
    assert.isNumber(convertHandler.getNum("1/5"), "Input is not a number");
    assert.isNumber(convertHandler.getNum("0/2"), "Input is not a number");
  });

  test("convertHandler Fraction and Decimal Input", function(){
    assert.isNumber(convertHandler.getNum("3.4/2"), "Input is not a number");
    assert.isNumber(convertHandler.getNum("3/2.5"), "Input is not a number");
  });

  test("convertHandler Double Fraction Error", function(){
    assert.isNotNumber(convertHandler.getNum("3/2/1"), "Double Fraction is being Read");
    assert.isNotNumber(convertHandler.getNum("32/2/2"), "Double Fraction is being Read");
  });

  test("convertHandler No Number Input", function(){
    assert.isNumber(convertHandler.getNum(""), "Should be 1");
  });

  test("convertHandler Valid Unit Inputs", function(){
    assert.equal(convertHandler.getUnit("lb"), "lb", "pound is not being returned properly");
    assert.equal(convertHandler.getUnit("gal"), "gal", "gallon is not being returned properly");
    assert.equal(convertHandler.getUnit("mi"), "mi", "Mile is not being returned properly");
    assert.equal(convertHandler.getUnit("km"), "km", "Kilometer is not being returned properly");
    assert.equal(convertHandler.getUnit("kg"), "kg", "kilograms is not being returned properly");
    assert.equal(convertHandler.getUnit("L"), "L", "Liters is not being returned properly");  
  });

  test('convertHandler invalid Unit Input', function(){
    assert.notEqual(convertHandler.getUnit("NOPE"), "This should be an invalid unit return");
    assert.notEqual(convertHandler.getUnit("RIO"), "This should be an invalid unit return");
    assert.notEqual(convertHandler.getUnit("MILE"), "This should be an invalid unit return");
  });

  test('convertHandler Get Return Unit', function(){
    //assert.strictEqual(convertHandler.getReturnUnit(""),)
    assert.strictEqual(convertHandler.getReturnUnit("lb"), "kg", "pounds not returning kilograms");
    assert.strictEqual(convertHandler.getReturnUnit("gal"), "L", "Gallons not returning Liters");
    assert.strictEqual(convertHandler.getReturnUnit("mi"), "km", "Mile not returning kilometers");
    assert.strictEqual(convertHandler.getReturnUnit("kg"), "lbs", "kilograms not returning pounds");
    assert.strictEqual(convertHandler.getReturnUnit("L"), "gal", "Liters not returning Gallons");
    assert.strictEqual(convertHandler.getReturnUnit("km"), "mi", "kilometer not returning Mile");
  });

  test("convertHandler Get return Unit String", function(){
    assert.strictEqual(convertHandler.spellOutUnit(convertHandler.getReturnUnit("lb")), "kilograms", "pounds not converting then returning kilgrams");
    assert.strictEqual(convertHandler.spellOutUnit(convertHandler.getReturnUnit("gal")), "Liters", "Gallons not converting then returning Liters");
    assert.strictEqual(convertHandler.spellOutUnit(convertHandler.getReturnUnit("mi")), "kilometers", "Mile not converting then returning kilometers");
    assert.strictEqual(convertHandler.spellOutUnit(convertHandler.getReturnUnit("kg")), "pounds", "kilograms not converting then returning pounds");
    assert.strictEqual(convertHandler.spellOutUnit(convertHandler.getReturnUnit("L")), "gallons", "Liters not converting then returning Gallons");
    assert.strictEqual(convertHandler.spellOutUnit(convertHandler.getReturnUnit("km")), "miles", "kilometer not converting then returning Mile");
  });
    //const galToL = 3.78541;
    //const lbsToKg = 0.453592;
    //const miToKm = 1.60934;
  test("convertHandler Gallon to Liters", function(){
    assert.equal(convertHandler.convert("1", "gal"), 3.78541, "1 Gallon is not converting to 3.78541 Liters");
  });
  
  test("convertHandler Liters to Gallons", function(){
    assert.equal(convertHandler.convert("3.78541", "L"), 1, "3.78541 liters is not converting to 1 gallon");
  });
  
  test("convertHandler Miles to Kilometers", function(){
    assert.equal(convertHandler.convert("1", "mi"), 1.60934, "1 mile is not converting to 1.60934 kilometers");
  });

  test("convertHandler kilometers to miles", function(){
    assert.equal(convertHandler.convert("1.60934", "km"), 1, "1.60934 kilometer is not converting to 1 mile");
  });

  test("convertHandler pounds to kilograms", function(){
    assert.equal(convertHandler.convert("1", "lbs"), 0.45359, "1 lbs is not converting to 0.453592 kilograms");
  });

  test("convertHandler kilograms to miles", function(){
    assert.equal(convertHandler.convert("0.45359", "kg"), 1, "0.453592 lbs is not converting to 1 kilograms");
  });
});
/*
suite('Unit Tests', function () {
  suite('Basic Assertions', function () {
    // #1
    test('#isNull, #isNotNull', function () {
      assert.isNull(null, 'this is an optional error description - e.g. null is null');
      assert.isNotNull(1, '1 is not null');
    });
    // #2
    test('#isDefined, #isUndefined', function () {
      assert.isDefined(null, 'null is not undefined');
      assert.isUndefined(undefined, 'undefined IS undefined');
      assert.isDefined('hello', 'a string is not undefined');
    });
    // #3
    test('#isOk, #isNotOk', function () {
      assert.isNotOk(null, 'null is falsey');
      assert.isOk("I'm truthy", 'a string is truthy');
      assert.isOk(true, 'true is truthy');
    });
    // #4
    test('#isTrue, #isNotTrue', function () {
      assert.isTrue(true, 'true is true');
      assert.isTrue(!!'double negation', 'double negation of a truthy is true');
      assert.isNotTrue({ value: 'truthy' }, 'A truthy object is NOT TRUE (neither is false...)');
    });
  });
*/
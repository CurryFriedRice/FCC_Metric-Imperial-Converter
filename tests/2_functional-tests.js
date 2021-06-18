const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test("10L GET conversion", function(){
    chai
      .request(server)
      .get("/api/convert/?input=10L")
      .end(function(err, res){
        //console.log(res);
        let baseData =
        {
          initNum: 10,
          initUnit: 'L',
          returnNum: 2.64172,
          returnUnit: 'gal',
          string: '10 Liters converts to 2.64172 gallons'
        }
        let compData = JSON.parse(res.text);
        assert.deepEqual(baseData, compData, "10 Liters is not converting to 2.6 Gallons");
      });
  });

test("32g Invalid Unit", function(){
   chai
      .request(server)
      .get("/api/convert/?input=32g")
      .end(function(err, res){
        //console.log(res);
        let baseData = "invalid unit";
        let compData = res.text;
        assert.equal(baseData, compData, "Comparison Data should be equal to invalid unit");
      });
  });

test("3/7.2/4kg Invalid Number", function(){
   chai
      .request(server)
      .get("/api/convert/?input=3/7.2/4kg")
      .end(function(err, res){
        //console.log(res);
        let baseData = "invalid number";
        let compData = res.text;
        assert.equal(baseData, compData, "Comparison data should be equal to invalid number");
      });
  });

  test("3/7.2/4kg Invalid Number", function(){
   chai
      .request(server)
      .get("/api/convert/?input=3/7.2/4kilomegagram")
      .end(function(err, res){
        //console.log(res);
        let baseData = "invalid number and unit";
        let compData = res.text;
        assert.equal(baseData, compData, "Comparison data should be equal to invalid number and unit");
      });
  });

    test("kg No number", function(){
   chai
      .request(server)
      .get("/api/convert/?input=kg")
      .end(function(err, res){
        //console.log(res);
        let baseData = 
        {
          initNum: 1,
          initUnit: 'kg',
          returnNum: 2.20462,
          returnUnit: 'lbs',
          string: ' kilograms converts to 2.20462 pounds'
        };
        let compData = JSON.parse(res.text);
        assert.deepEqual(baseData, compData, "Lack of Nubmer is not being read");
      });
  });
  /*
   chai
      .request(server)
      .get(PUT URL HERE)
      .end(function(err, res){
       
      });
  });
  */
});


/*
suite("Functional Tests", function () {
  suite("Integration tests with chai-http", function () {
    // #1
    test("Test GET /hello with no name", function (done) {
      chai
        .request(server)
        .get("/hello")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello Guest");
          done();
        }); 
    });
    // #2
    test("Test GET /hello with your name", function (done) {
      chai
        .request(server)
        .get("/hello?name=xy_z")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello xy_z");
          done();
        });
    });
    // #3
      test('send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put("/travellers")
        .send({surname: "Colombo"})
        .end(function (err, res) {
          //console.log(res.body);
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.name, 'Cristoforo');
          assert.equal(res.body.surname, 'Colombo');

          done();
        });
    });
    // #4
    test('send {surname: "da Verrazzano"}', function (done) {
      chai
      .request(server)
      .put("/travellers")
      .send({surname: "da Verrazzano"})
      .end(function(err,res){
          //console.log(res.body);
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json');
          assert.equal(res.body.name, 'Giovanni');
          assert.equal(res.body.surname, 'da Verrazzano');

          done();
      });
    });

  });
});
*/
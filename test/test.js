const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;

const app = require('../lib/app');
const Employee = require('../model/Employee');
const expect = chai.expect;

chai.use(chaiHttp);

describe ('Sequelize', () => {

  before( done => {
    Employee.sync()
            .then( ()=> done())
            .catch( err => {
              console.log(err);
              done();
            });
  });

  //POST
  it('should post the json employee to database and return the json obj back', (done) => {
    var testJson = {
          _id: "testing",
          name: "testing",
          username: "testing",
          phone: "999-999-9999",
          email: "test@testing.com",
          position: "accountant"
        }
    chai.request(app)
        .post('/employees')
        .send(testJson)
        .end((err, res) => {
          expect(err).to.be.null;
          var receivedObj = res.body;
          Object.keys(testJson).forEach((key) => {
            assert.equal(testJson[key], receivedObj[key], `it failed at ${key}`);
          });
          done();
        });
  });

  //Data Validation
  it('should receive status 500 trying to post the wrong phone format', (done) => {
    var testJson = {
      _id: "testing",
      name: "testing",
      username: "testing",
      phone: "99-999-9999",
      email: "test@testing.com",
      position: "accountant"
    };
    chai.request(app)
        .post('/employees')
        .send(testJson)
        .end((err, res) => {
          expect(res).to.have.status(500);
          done();
        });
  });

  it('should receive status 500 trying to post the wrong position option', (done) => {
    var testJson = {
      _id: "testing",
      name: "testing",
      username: "testing",
      phone: "99-999-9999",
      email: "test@testing.com",
      position: "Testing"
    };
    chai.request(app)
        .post('/employees')
        .send(testJson)
        .end((err, res) => {
          expect(res).to.have.status(500);
          done();
        });
  });

  //GET
  it('should get an array of json objects back with /GET', (done) => {
    chai.request(app)
        .get('/employees')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.length).to.not.be.undefined;
          done();
        });
  });

  //GET Specific Id
  it('should return a json object that has id matching the requested id', (done) => {
    chai.request(app)
        .get('/employees/testing')
        .end((err, res) => {
          console.log('RUNNNNNN');
          expect(err).to.be.null;
          console.log('RES BODYYY',res.body);
          expect(res.body['_id']).to.equal('testing');
          done();
        });
  });

  //DELETE
  it('should receive status 200 after succesfully deleting the requested record', (done) => {
    chai.request(app)
        .delete('/employees/testing')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.status).to.equal(200);
          done();
        });
  });


});

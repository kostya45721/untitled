const app = require('./express').app;
const request = require('supertest');
const chai = require('chai');
const assert = chai.assert;
let userId;
let newUser = {
  name: "john",
  surname: "Smith",
  email: "someEmail@mail.com",
  phonenumber: "1234567890",
  dateOfBirth: new Date().toDateString(),
  dateOfAdded: new Date().toDateString(),
  dateOfChanged: new Date().toDateString()
};
let changeUser = {
  name: "Andrew",
  surname: "Jonson",
  email: "someEmail2@mail.com",
  phonenumber: "0987654321",
  dateOfBirth: new Date().toDateString(),
  dateOfAdded: new Date().toDateString(),
  dateOfChanged: new Date().toDateString()
};

describe("express and elasticsearch test",function () {
  it('should create user and return id', function (done) {
    request(app)
      .post('/user')
      .send(newUser)
      .then( res => {
        userId = res.body._id;
        assert.equal('created', res.body.result);
        assert.equal(200, res.status);
        done();
    })
  });

  it('should response user',  function (done) {
     request(app)
      .get('/user/' + userId).then(res => {
       assert.equal(200, res.status);
        done();
     });
  });

  it('should change user', function (done) {
    request(app)
      .put('/user/' + userId)
      .send(changeUser)
      .then( res => {
        assert.equal(200, res.status);
        assert.equal('updated', res.body.result);
        assert.equal(userId, res.body._id);
        done();
      })
  });

  it('should response user and compare it', function (done) {
    request(app)
      .get('/user/' + userId)
      .then( res => {
        assert.equal(200, res.status);
        let user = res.body._source;
        assert.deepEqual(user, changeUser);
        done();
      })
  });

  it('should delete user', function (done) {
    request(app)
      .delete('/user/' + userId)
      .then( res => {
        assert.equal(200, res.status);
        assert.equal('deleted', res.body.result);
        done();
      })
  });

  it('should 404 Not Found', function (done) {
    request(app)
      .get('/user/' + userId)
      .then( res => {
        assert.equal(404, res.status);
        done();
      })
  });
});

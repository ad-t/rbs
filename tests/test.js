const supertest = require("supertest");
const chai = require("chai");
var expect = chai.expect;

const API_URL = "http://localhost:8080";
const server = supertest.agent(API_URL);

describe("productions", () => {
  it ("gets all of the active productions",
    function (done) {
      server.get("/productions")
            .expect(200)
            .end( function (err, res) {
              expect(res.body).to.be.an('array').that.is.not.empty;
              for (const production of res.body) {
                for (const prop of ["id", "title", "subtitle", "year", "description", "location", "shows"]) {
                  expect(production).to.have.property(prop);
                }
              }
              done();
            });
    });

  it ("gets all the shows for an active production",
    function (done) {
      server.get("/productions/1/shows")
            .expect(200)
            .end( function (err, res) {
              for (const show of res.body) {
                for (const prop of ["id", "time", "totalSeats", "reservedSeats"]) {
                  expect(show).to.have.property(prop);
                }
              }
              done();
            });
    });

  it ("get request for an non-existent production id",
    function (done) {
      server.get("/productions/999999/shows")
            .expect(404, done);
    });

  it ("returns a bad request for an invalid production id integer (negative)",
    function (done) {
      server.get("/productions/-999999/shows")
            .expect(400, done);
    });

  it ("returns a bad request for an invalid production id integer (floating point)",
    function (done) {
      server.get("/productions/9999.99/shows")
            .expect(400, done);
    });

  it ("returns a bad request for an invalid production id integer (string)",
    function (done) {
      server.get("/productions/undefined/shows")
            .expect(400, done);
    });

  it ("returns a bad request for an invalid production id integer (string with integer)",
    function (done) {
      server.get("/productions/undefined123/shows")
            .expect(400)
            .end( function (err, res) {
              expect(res.status).to.equal(400);
              done();
            });
    });
});

describe("shows", () => {
  it ("gets the seat count for a valid show",
    function (done) {
      server.get("/shows/1")
            .expect(200)
            .end( function (err, res) {
              for (const prop of ["id", "time", "production", "totalSeats", "reservedSeats"]) {
                expect(res.body).to.have.property(prop);
              }
              done();
            });
    });

  it ("get request for a non-existent show",
    function (done) {
      server.get("/shows/99999")
            .expect(404, done);
    });

  it ("get bad request for an invalid show (negative)",
    function (done) {
      server.get("/shows/-99999")
            .expect(400, done);
    });

  it ("get bad request for an invalid show (floating point)",
    function (done) {
      server.get("/shows/2134.324")
            .expect(400, done);
    });

  it ("get bad request for an invalid show (string)",
    function (done) {
      server.get("/shows/undefined")
            .expect(400, done);
    });

  it ("get bad request for an invalid show (string with number)",
    function (done) {
      server.get("/shows/1234undefined")
            .expect(400, done);
    });

  it ("reserve a ticket for a valid show",
    function (done) {
      server.post("/shows/1/seats")
            .send({
              "name": "John Smith",
              "email": "john@example.com",
              "phone": "0412345678",
              "seats": [{
                "numSeats": 1,
                "ticketType": 1
              }]
            })
            .expect(201, done);
    });
});

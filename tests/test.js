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
              expect(res.status).to.equal(200);
              for (const prop in ["id", "title", "subtitle", "year", "description", "shows"]) {
                expect(res.body).to.have.property(prop);
              }
              done();
            });
    });

  it ("gets all the shows for an active production",
    function (done) {
      server.get("/productions/1/shows")
            .expect(200)
            .end( function (err, res) {
              expect(res.status).to.equal(200);
              for (const show in res.body) {
                for (const prop in ["id", "location", "time", "production", "seats"]) {
                  expect(show).to.have.property(prop);
                }
              }
              done();
            });
    });

  it ("retures a bad request for an invalid production id",
    function (done) {
      server.get("/productions/999999/shows")
            .expect(400)
            .end( function (err, res) {
              expect(res.status).to.equal(400);
              done();
            });
    });

  it ("retures a bad request for an invalid production id integer (negative)",
    function (done) {
      server.get("/productions/-999999/shows")
            .expect(400)
            .end( function (err, res) {
              expect(res.status).to.equal(400);
              done();
            });
    });

  it ("retures a bad request for an invalid production id integer (floating point)",
    function (done) {
      server.get("/productions/9999.99/shows")
            .expect(400)
            .end( function (err, res) {
              expect(res.status).to.equal(400);
              done();
            });
    });

  it ("retures a bad request for an invalid production id integer (string)",
    function (done) {
      server.get("/productions/undefined/shows")
            .expect(400)
            .end( function (err, res) {
              expect(res.status).to.equal(400);
              done();
            });
    });

  it ("retures a bad request for an invalid production id integer (string with integer)",
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
      server.get("/shows/1/seats")
            .expect(200)
            .end( function (err, res) {
              expect(res.status).to.equal(200);
              for (const prop in ["id", "location", "time", "production", "seats"]) {
                expect(res.body).to.have.property(prop);
              }
              done();
            });
    });

  it ("get bad request for an invalid show",
    function (done) {
      server.get("/shows/99999/seats")
            .expect(400)
            .end( function (err, res) {
              expect(res.status).to.equal(400);
              done();
            });
    });

  it ("get bad request for an invalid show (negative)",
    function (done) {
      server.get("/shows/-99999/seats")
            .expect(400)
            .end( function (err, res) {
              expect(res.status).to.equal(400);
              done();
            });
    });

  it ("get bad request for an invalid show (floating point)",
    function (done) {
      server.get("/shows/2134.324/seats")
            .expect(400)
            .end( function (err, res) {
              expect(res.status).to.equal(400);
              done();
            });
    });

  it ("get bad request for an invalid show (string)",
    function (done) {
      server.get("/shows/undefined/seats")
            .expect(400)
            .end( function (err, res) {
              expect(res.status).to.equal(400);
              done();
            });
    });

  it ("get bad request for an invalid show (string with number)",
    function (done) {
      server.get("/shows/1234undefined/seats")
            .expect(400)
            .end( function (err, res) {
              expect(res.status).to.equal(400);
              done();
            });
    });
});

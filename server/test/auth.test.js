const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);

describe("Auth API", () => {
  it("Welcomes user to Ballot.io", (done) => {
    chai.request(app)
      .get("/auth/welcome")
      .end((err, res) => {
        expect(res).to.have.status(200);
        // expect(res.body.status).to.equals("success");
        // expect(res.body.message).to.equals("Welcome To Testing API");
        done();
      });
  });
});
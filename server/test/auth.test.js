const server = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

const assert = chai.assert;

chai.use(chaiHttp);

describe("Auth API", () => {

  /**
   *  Test welcomeController
   */

  describe('It should say welcome', () => {

    it("Welcomes user to Ballot.io", (done) => {
      chai.request(server)
        .get("/auth/welcome")
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });

  });


  /**
   * Test the /POST route (registerController)
   */

  describe('POST /auth/register', () => {
    
    it('Required fields filled in', (done) => {
      chai.request(server)
        .post("/auth/register")
        .send({
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          password: '111111'
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });

  });
  
  
});
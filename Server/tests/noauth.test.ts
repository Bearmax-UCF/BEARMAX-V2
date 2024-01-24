// unit testing for api endpoints
import request from "supertest";

import app from '../src/index.ts';

var authToken = '';
var userId = '';

describe("Testing no auth endpoints", () => {
  test("This should be a valid registration", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "test@test.com",
      firstName: "tester",
      lastName: "test",
      password: "test"
    });
  })
}); 
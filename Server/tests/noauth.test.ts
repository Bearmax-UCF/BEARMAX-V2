// unit testing for api endpoints
import request from "supertest";
import app from '../src/index.ts';
import { createVerifiedUser, removeAllUsers, createRandomObjectId } from "./testFunctionUtil.ts";

var authToken = '';
var userId = '';
// set up database stuff
beforeAll(async () => {
  const user = await createVerifiedUser();
  userId = user!._id.toString();
})
afterAll(async () => {
  await removeAllUsers();
})
describe("Testing registration endpoint", () => {
  test("This should be a valid registration", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "test@test.com",
      firstName: "tester",
      lastName: "test",
      password: "test"
    });
    expect(response.statusCode).toEqual(201);
    expect(response.body.message).toEqual("User created successfully!");
  });
  test("This should be a invalid registration", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "test@test.com",
      firstName: "tester",
      lastName: "test",
      password: "test"
    });
    expect(response.statusCode).toEqual(422);
    expect(response.body.message).toEqual("Another User with this email already exists!");
  });
  test("This should be another invalid registration from missing fields", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "test@test.com",
      password: "test"
    });
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual("Missing one or more fields.");
  });

}); 

describe("Testing login endpoint", () => {
  test("This should be a valid login but user is not verified", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "test"
    });
    expect(response.statusCode).toEqual(422);
    expect(response.body.message).toEqual("Account not verified.");
  });
  test("This should be a valid login", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "random@random.com",
      password: "123456"
    });
    expect(response.statusCode).toEqual(200);
    expect(response.body.token).toBeDefined();
  });
  test("This should be a invalid login", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "random@test.com",
      password: "test"
    });
    expect(response.statusCode).toEqual(422);
    expect(response.body.message).toEqual("Incorrect username or password.");
  });
});

describe("Testing forgot password request endpoint", () => {
  test("This should be a valid forgot password request", async () => {
    const response = await request(app).post("/api/auth/forgotPasswordRequest").send({
      email: "random@random.com"
    });
    expect(response.statusCode).toEqual(201);
    expect(response.body.message).toEqual("Password Reset Request Sent Successfully!");
  })
  test("This should be a invalid forgot password request because account doesn't exist", async () => {
    const response = await request(app).post("/api/auth/forgotPasswordRequest").send({
      email: "noemail@noemail.com"
    });
    expect(response.statusCode).toEqual(422);
    expect(response.body.message).toEqual("User not found.");
  });
  test("This should be a invalid forgot password request because of missing email field", async () => {
    const response = await request(app).post("/api/auth/forgotPasswordRequest").send({
    });
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual("Missing email field.");
  });
});
describe("Testing reset password endpoint", () => {
  test("This should be an invalid password reset request due to empty fields", async () => {
    const response = await request(app).post("/api/auth/resetPassword").send({

    });
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toEqual("Missing one or more fields.");
  });
  test("This should be an invalid password reset request due to invalid userId", async () => {
    const response = await request(app).post("/api/auth/resetPassword").send({
      token: "invalidtoken",
      id: "invalidid",
      password: "newpassword"
    });
    expect(response.statusCode).toEqual(422);
    expect(response.body.message).toEqual("Reset token not found.");
  });
  test("This should be an invalid password reset due to invalid token", async () => {
    const response = await request(app).post("/api/auth/resetPassword").send({
      token: "invalidtoken",
      id: userId,
      password: "newpassword"
    });
    expect(response.statusCode).toEqual(422);
    expect(response.body.message).toEqual("Invalid token.");
  });
});

describe("Testing verify email endpoint", () => {
  test("This should be an invalid email verify request due to invalid userId", async () => {
    const response = await request(app).get("/api/auth/verify").query({
      id: await createRandomObjectId(),
    });
    expect(response.statusCode).toEqual(422);
    expect(response.body.message).toEqual("User not found.");
  });
  test("This should be an invalid email verify request due to the fact that user is already verified", async () => {
    const response = await request(app).get("/api/auth/verify").query({
      id: userId,
      token: "invalidtoken"
    });
    expect(response.statusCode).toEqual(422);
    expect(response.body.message).toEqual("User already verified.");
  });
})
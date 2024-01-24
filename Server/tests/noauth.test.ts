// unit testing for api endpoints
import request from "supertest";
import User from "../src/models/User";
import app from '../src/index.ts';

var authToken = '';
var userId = '';

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
    // create verified user for simpler testing
    await new User({
      email: "random@random.com",
      firstName: "random",
      lastName: "random",
      password: "123456",
    }).save();
    const user = await User.findOne({ email: "random@random.com" });
    user!.isVerified = true;
    await user!.save();
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
import request from "supertest";
import app from '../src/index.ts';
import { createVerifiedUserWithGivenParameters, createRandomObjectId, removeCertainUser } from "./testFunctionUtil.ts";

var userId = '';
var jwtToken = '';
var userToDelete;
beforeAll(async () => {
    const user = await createVerifiedUserWithGivenParameters(
        "users@user.com", 
        "first", 
        "last",
        "password");
    userId = user!._id.toString();
    const response = await request(app).post("/api/auth/login").send({
        email: "users@user.com",
        password: "password"
    });
    jwtToken = response.body.token;
    userToDelete = await createVerifiedUserWithGivenParameters(
        "delete@delete.com",
        "delete",
        "delete",
        "delete"
    );
});

afterAll(async () => {
    removeCertainUser("users@user.com");
});

describe("Testing delete endpoint", () => {
    test("This should be a an invalid deletion because of no jwt", async () => {
        const response = await request(app).delete("/api/users/" + userToDelete!._id).send({
        });
        expect(response.statusCode).toEqual(401);
        expect(response.text).toEqual("Unauthorized");
    });
    test("This should be a an invalid deletion because of invalid jwt", async () => {
        const response = await request(app).delete("/api/users/" + userToDelete!._id).send({
        }).set('Authorization', 'Bearer ' + 'invalid');
        expect(response.statusCode).toEqual(401);
        expect(response.text).toEqual("Unauthorized");
    });
    test("This should be a valid deletion", async () => {
        const response = await request(app).delete("/api/users/" + userToDelete._id).send({
        }).set('Authorization', 'Bearer ' + jwtToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.user._id).toEqual(userToDelete._id.toString());
    });
});

describe("Testing the get me user endpoint", () => {
    test("This should be a an invalid get me because of no jwt", async () => {
        const response = await request(app).get("/api/users/me").send({
        });
        expect(response.statusCode).toEqual(401);
        expect(response.text).toEqual("Unauthorized");
    });
    test("This should be a valid get me user", async () => {
        const response = await request(app).get("/api/users/me").send({}).set('Authorization', 'Bearer ' + jwtToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.me._id).toEqual(userId);
    });
});

describe("Testing the PATCH endpoint", () => {  
    test("This should be a an invalid PATCH because of no jwt", async () => {
        const response = await request(app).patch("/api/users/" + userId).send({
        });
        expect(response.statusCode).toEqual(401);
        expect(response.text).toEqual("Unauthorized");
    });
    test("This should be an invalid PATCH because of nonexistent user ID", async () => {
        const response = await request(app).patch("/api/users/" + await createRandomObjectId()).send({
        }).set('Authorization', 'Bearer ' + jwtToken);
        expect(response.statusCode).toEqual(404);
        expect(response.body.message).toEqual("User not found");
    });
    test("This should be an invalid patch ", async () => {
        const response = await request(app).patch("/api/users/" + userId).send({}).set('Authorization', 'Bearer ' + jwtToken);
        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual("No fields provided to update");
    })
    test("This should be an invalid patch because of already taken email", async () => {
        const response = await request(app).patch("/api/users/" + userId).send({
            email: "users@user.com"
        }).set('Authorization', 'Bearer ' + jwtToken);
        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual("Email already taken");
    });
    test("This should be a valid PATCH", async () => {
        const response = await request(app).patch("/api/users/" + userId).send({
            firstName: "newFirst",
            lastName: "newLast",
        }).set('Authorization', 'Bearer ' + jwtToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.user.firstName).toEqual("newFirst");
        expect(response.body.user.lastName).toEqual("newLast");
    }); 
});
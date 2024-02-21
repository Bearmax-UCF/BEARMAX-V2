import request from "supertest";
import app from '../src/index.ts';

import { createVerifiedUserWithGivenParameters, createRandomObjectId, removeCertainUser, createEmotionRecognitionGameForVerifiedUser } from "./testFunctionUtil.ts";

var userId = '';
var jwtToken = '';
var emotionRecognitionGameToDelete;

beforeAll(async () => {
    const user = await createVerifiedUserWithGivenParameters(
        "emotionRecognition@emotion.com",
        "first",
        "last",
        "password"
    );
    userId = user!._id.toString();
    const response = await request(app).post("/api/auth/login").send({
        email: "emotionRecognition@emotion.com",
        password: "password"
    });
    jwtToken = response.body.token;
    emotionRecognitionGameToDelete = await createEmotionRecognitionGameForVerifiedUser(userId);
});

afterAll(async () => {
    removeCertainUser("emotionRecognition@emotion.com");
});

describe("Testing the get emotionRecognition endpoint", () => {
    test("This should be a an invalid get emotionRecognition because of no jwt", async () => {
        const response = await request(app).get("/api/emotionRecognition").send({
        });
        expect(response.statusCode).toEqual(401);
        expect(response.text).toEqual("Unauthorized");
    });
    test("This should be a valid get emotionRecognition", async () => {
        const response = await request(app).get("/api/emotionRecognition").send({
        }).set('Authorization', 'Bearer ' + jwtToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.allGames.length).toEqual(1);
    });
});

describe("Testing the DELETE emotionRecognition endpoint", () => {
    test("This should be a an invalid DELETE emotionRecognition because of no jwt", async () => {
        const response = await request(app).delete("/api/emotionRecognition/" + emotionRecognitionGameToDelete._id).send({
        });
        expect(response.statusCode).toEqual(401);
        expect(response.text).toEqual("Unauthorized");
    });
    test("This should be a valid DELETE emotionRecognition", async () => {
        const response = await request(app).delete("/api/emotionRecognition/" + emotionRecognitionGameToDelete._id).send({
        }).set('Authorization', 'Bearer ' + jwtToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.deleted._id).toEqual(emotionRecognitionGameToDelete._id.toString());
    });
});
import request from "supertest";
import app from '../src/index.ts';
import { createVerifiedUserWithGivenParameters, createRandomObjectId, removeCertainUser, createNoteForVerifiedUser } from "./testFunctionUtil.ts";

var userId = '';
var jwtToken = '';
var noteToUpdate;
beforeAll(async () => {
    const user = await createVerifiedUserWithGivenParameters(
        "notes@note.com",
        "first",
        "last",
        "password"
    );
    userId = user!._id.toString();
    const response = await request(app).post("/api/auth/login").send({
        email: "notes@note.com",
        password: "password"
    });

    jwtToken = response.body.token;

    noteToUpdate = await createNoteForVerifiedUser("title", userId, "note");
});

afterAll(async () => {
    removeCertainUser("notes@note.com");
});

describe("Testing the get notes endpoint", () => {
    test("This should be a an invalid get notes because of no jwt", async () => {
        const response = await request(app).get("/api/note").send({
        });
        expect(response.statusCode).toEqual(401);
        expect(response.text).toEqual("Unauthorized");
    });
    test("This should be a valid get notes", async () => {
        const response = await request(app).get("/api/note").send({
        }).set('Authorization', 'Bearer ' + jwtToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.length).toEqual(1);
    });
});

describe("Testing the POST notes endpoint", () => {
    test("This should be a an invalid POST notes because of no jwt", async () => {
        const response = await request(app).post("/api/note").send({
            title: "title",
            date: new Date(),
            note: "note",
        });
        expect(response.statusCode).toEqual(401);
        expect(response.text).toEqual("Unauthorized");
    });
    test("This should be a an invalid POST notes because of missing fields", async () => {
        const response = await request(app).post("/api/note").send({
            date: new Date(),
            note: "note",
        }).set('Authorization', 'Bearer ' + jwtToken);
        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual("Missing one or more fields.");
    });
    test("This should be a valid POST notes", async () => {
        const response = await request(app).post("/api/note").send({
            title: "title",
            date: new Date(),
            note: "note",
        }).set('Authorization', 'Bearer ' + jwtToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.newNote.title).toEqual("title");
        expect(response.body.newNote.note).toEqual("note");
    });
})

describe("Testing the PATCH notes endpoint", () => {
    test("This should be a an invalid PATCH notes because of no jwt", async () => {
        const response = await request(app).patch("/api/note/" + noteToUpdate._id).send({
            title: "title",
            note: "note",
        });
        expect(response.statusCode).toEqual(401);
        expect(response.text).toEqual("Unauthorized");
    });
    test("This should be a an invalid PATCH notes because of missing at least one field", async () => {
        const response = await request(app).patch("/api/note/" + noteToUpdate._id).send({
        }).set('Authorization', 'Bearer ' + jwtToken);
        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual("Missing at least one field");
    });
    test("This should be a valid PATCH notes", async () => {
        const response = await request(app).patch("/api/note/" + noteToUpdate._id).send({
            note: "new note",
        }).set('Authorization', 'Bearer ' + jwtToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({});
    });
    test("This should also be a valid PATCH notes", async () => {
        const response = await request(app).patch("/api/note/" + noteToUpdate._id).send({
            title: "new title",
        }).set('Authorization', 'Bearer ' + jwtToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({});
    });
});

describe("Testing the DELETE notes endpoint", () => {
    test("This should be a an invalid DELETE notes because of no jwt", async () => {
        const response = await request(app).delete("/api/note/" + noteToUpdate._id).send({
        });
        expect(response.statusCode).toEqual(401);
        expect(response.text).toEqual("Unauthorized");
    });
    test("This should be an invalid DELETE notes because of missing id", async () => {
        const response = await request(app).delete("/api/note/" + noteToUpdate._id).send({
        }).set('Authorization', 'Bearer ' + jwtToken);
        expect(response.statusCode).toEqual(200);
        expect(response.body.title).toEqual("new title");
    });
});
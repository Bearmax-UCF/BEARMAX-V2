import request from "supertest";
import app from '../src/index.ts';

describe("Testing no auth endpoints", () => {
    test("This should be a valid registration", async () => {
        const response = await request(app).post("/api/auth/register").send({
            email: "",
        });
        expect(response.statusCode).toEqual(400);
    });
});
import request from "supertest";

import {app, server} from "../src/app";

describe("GET /health", () => {
    it("should return 200 OK", async () => {
        const response = await request(app).get("/health");
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("OK");
		expect(response.body).toHaveProperty("uptime");
		expect(response.body).toHaveProperty("timestamp");
		expect(response.body).toHaveProperty("version");
    });
});

afterAll(async () => {
    await server.close();
  });
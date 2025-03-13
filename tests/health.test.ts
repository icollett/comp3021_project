jest.mock("../src/api/v1/routes/employeeRoutes", () => {
    // Create a mock router with mock route handlers
    const mockRouter = {
        get: jest.fn().mockReturnThis(),
        post: jest.fn().mockReturnThis(),
        put: jest.fn().mockReturnThis(),
        delete: jest.fn().mockReturnThis(),
    };

    // Mock the express.Router() creation
    const router = () => mockRouter;
    router.get = mockRouter.get;
    router.post = mockRouter.post;
    router.put = mockRouter.put;
    router.delete = mockRouter.delete;

    return {
        __esModule: true,
        default: router,
    };
});

jest.mock("../config/firebase", () => ({
    default: {
        collection: jest.fn(),
        runTransaction: jest.fn(),
        batch: jest.fn()
    }
}));

import request, {Response} from "supertest";

import app from "../src/app";

describe("GET /health", () => {
    it("should return 200 OK", async () => {
        const response: Response = await request(app).get("/health");
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("OK");
		expect(response.body).toHaveProperty("uptime");
		expect(response.body).toHaveProperty("timestamp");
		expect(response.body).toHaveProperty("version");
    });
});
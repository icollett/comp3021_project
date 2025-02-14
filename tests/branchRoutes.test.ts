import request from "supertest";
import app from "../src/app";
import * as branchController from "../src/api/v1/controllers/branchController";

jest.mock("../src/api/v1/controllers/branchController", () => ({
	getAllBranches: jest.fn((req, res) => res.status(200).send()),
	createBranch: jest.fn((req, res) => res.status(201).send()),
    getBranch: jest.fn((req, res) => res.status(200).send()),
	updateBranch: jest.fn((req, res) => res.status(200).send()),
	deleteBranch: jest.fn((req, res) => res.status(200).send()),
}));

describe("Branch API Endpoints", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should call createBranch controller", async () => {
        const mockItem = {name: "Vancouver Branch", address: "1300 Burrard St, Vancouver, BC, V6Z 2C7", phone: "604-456-0022",};
        await request(app).post("/api/v1/branches").send(mockItem);
        expect(branchController.createBranch).toHaveBeenCalled();
    });

    it("should call getAllBranches controller", async () => {
        await request(app).get("/api/v1/branches");
        expect(branchController.getAllBranches).toHaveBeenCalled();
    });

    it("should call getBranch controller", async () => {
        await request(app).get("/api/v1/branches/1");
        expect(branchController.getBranch).toHaveBeenCalled();
    });

    it("should call updateBranch controller", async () => {
        const mockItem = {
            name: "Sydney Branch",
            phone: "604-456-0022",
        };
        await request(app).put("/api/v1/branches/1").send(mockItem);
        expect(branchController.updateBranch).toHaveBeenCalled();
    });

    it("should call deleteBranch controller", async () => {
        await request(app).delete("/api/v1/branches/1");
        expect(branchController.deleteBranch).toHaveBeenCalled();
    });
});
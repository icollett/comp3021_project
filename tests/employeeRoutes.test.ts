jest.mock("../src/api/v1/controllers/employeeController", () => ({
	getAllEmployees: jest.fn((req, res) => res.status(200).send()),
	createEmployee: jest.fn((req, res) => res.status(201).send()),
    getEmployee: jest.fn((req, res) => res.status(200).send()),
	updateEmployee: jest.fn((req, res) => res.status(200).send()),
	deleteEmployee: jest.fn((req, res) => res.status(200).send()),
    getBranchEmployees: jest.fn((req, res) => res.status(200).send()),
    getDepartmentEmployees: jest.fn((req, res) => res.status(200).send()),
}));

jest.mock("../config/firebase", () => ({
    default: {
        collection: jest.fn(),
        runTransaction: jest.fn(),
        batch: jest.fn()
    }
}));

import request from "supertest";
import app from "../src/app";
import {
    getAllEmployees,
    createEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee,
    getBranchEmployees,
    getDepartmentEmployees,
} from "../src/api/v1/controllers/employeeController";

describe("Employee route endpoints", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

	it("should call createEmployee controller", async () => {
        const mockItem = {name: "Alice Johnson", position: "Branch Manager", department: "Management", email: "alice.johnson@pixell-river.com", phone: "604-555-0148", branchID: "1"};
        await request(app).post("/api/v1/employees").send(mockItem);
        expect(createEmployee).toHaveBeenCalled();
    });

    it("should call getAllEmployees controller", async () => {
        await request(app).get("/api/v1/employees");
        expect(getAllEmployees).toHaveBeenCalled();
    });

    it("should call getEmployee controller", async () => {
        await request(app).get("/api/v1/employees/1");
        expect(getEmployee).toHaveBeenCalled();
    });

    it("should call updateEmployee controller", async () => {
        const mockItem = {name: "Alice Jackson", branchID: "3"};
        await request(app).put("/api/v1/employees/1").send(mockItem);
        expect(updateEmployee).toHaveBeenCalled();
    });

    it("should call deleteEmployee controller", async () => {
        await request(app).delete("/api/v1/employees/1");
        expect(deleteEmployee).toHaveBeenCalled();
    });

    it("should call getBranchEmployees controller", async () => {
        await request(app).get("/api/v1/employees/branch/1");
        expect(getBranchEmployees).toHaveBeenCalled();
    });

    it("should call getDepartmentEmployees controller", async () => {
        await request(app).get("/api/v1/employees/department/Loans");
        expect(getDepartmentEmployees).toHaveBeenCalled();
    });
});
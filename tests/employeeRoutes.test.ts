import request from "supertest";
import {app, server} from "../src/app";
import * as employeeController from "../src/api/v1/controllers/employeeController";

jest.mock("../src/api/v1/controllers/employeeController", () => ({
	getAllEmployees: jest.fn((req, res) => res.status(200).send()),
	createEmployee: jest.fn((req, res) => res.status(201).send()),
    getEmployee: jest.fn((req, res) => res.status(200).send()),
	updateEmployee: jest.fn((req, res) => res.status(200).send()),
	deleteEmployee: jest.fn((req, res) => res.status(200).send()),
    getBranchEmployees: jest.fn((req, res) => res.status(200).send()),
    getDepartmentEmployees: jest.fn((req, res) => res.status(200).send()),
}));

describe("Employee API Endpoints", () => {
	it("should call createEmployee controller", async () => {
        const mockItem = {name: "Alice Johnson", position: "Branch Manager", department: "Management", email: "alice.johnson@pixell-river.com", phone: "604-555-0148", branchID: "1"};
        await request(app).post("/api/v1/employees").send(mockItem);
        expect(employeeController.createEmployee).toHaveBeenCalled();
    });

    it("should call getAllEmployees controller", async () => {
        await request(app).get("/api/v1/employees");
        expect(employeeController.getAllEmployees).toHaveBeenCalled();
    });

    it("should call getEmployee controller", async () => {
        await request(app).get("/api/v1/employees/1");
        expect(employeeController.getEmployee).toHaveBeenCalled();
    });

    it("should call updateEmployee controller", async () => {
        const mockItem = {name: "Alice Jackson", branchID: "3"};
        await request(app).put("/api/v1/employees/1").send(mockItem);
        expect(employeeController.updateEmployee).toHaveBeenCalled();
    });

    it("should call deleteEmployee controller", async () => {
        await request(app).delete("/api/v1/employees/1");
        expect(employeeController.deleteEmployee).toHaveBeenCalled();
    });

    it("should call getBranchEmployees controller", async () => {
        await request(app).get("/api/v1/employees/branch/1");
        expect(employeeController.getBranchEmployees).toHaveBeenCalled();
    });

    it("should call getDepartmentEmployees controller", async () => {
        await request(app).get("/api/v1/employees/department/Loans");
        expect(employeeController.getDepartmentEmployees).toHaveBeenCalled();
    });
});

afterAll(async () => {
    await server.close();
});
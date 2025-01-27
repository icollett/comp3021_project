import { Request, Response, NextFunction } from "express";
import * as employeeController from "../src/api/v1/controllers/employeeController";
import * as employeeService from "../src/api/v1/services/employeeService";

jest.mock("../src/api/v1/services/employeeService");

describe("Employee Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        mockNext = jest.fn();
    });

    describe("getAllEmployees", () => {
        it("should handle successful operation", async () => {
            const mockItems: employeeService.Employee[] = [
                { id: "1", name: "Alice Johnson", position: "Branch Manager", department: "Management", email: "alice.johnson@pixell-river.com", phone: "604-555-0148", branchID: "1"},
            ];

            (employeeService.getAllEmployees as jest.Mock).mockResolvedValue(mockItems);

            await employeeController.getAllEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employees Retrieved",
                data: mockItems,
            });
        });
    });

    describe("createEmployee", () => {
        it("should handle successful operation", async () => {
            const mockItems = {
                id: "1",
                name: "Alice Johnson",
                position: "Branch Manager",
                department: "Management",
                email: "alice.johnson@pixell-river.com",
                phone: "604-555-0148",
                branchID: "1"
            };

            (employeeService.createEmployee as jest.Mock).mockResolvedValue(mockItems);

            mockReq = { params: {}, body: {name: "Alice Johnson", position: "Branch Manager", department: "Management", email: "alice.johnson@pixell-river.com", phone: "604-555-0148", branchID: "1"} };
            await employeeController.createEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee Created",
                data: mockItems,
            });
        });
    });

    describe("getEmployee", () => {
        it("should handle successful operation", async () => {
            const mockItems = {
                id: "1",
                name: "Alice Johnson",
                position: "Branch Manager",
                department: "Management",
                email: "alice.johnson@pixell-river.com",
                phone: "604-555-0148",
                branchID: "1"
            };

            (employeeService.getEmployee as jest.Mock).mockResolvedValue(mockItems);

            mockReq = { params: {id: "1"}, body: {}};
            await employeeController.getEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee Found",
                data: mockItems,
            });
        });
    });

    describe("updateEmployee", () => {
        it("should handle successful operation", async () => {
            const mockItems = {name: "Alice Jackson", branchID: "3"};

            (employeeService.updateEmployee as jest.Mock).mockResolvedValue(mockItems);

            mockReq = { params: {id: "1"}, body: mockItems };
            await employeeController.updateEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee Updated",
                data: mockItems,
            });
        });
    });

    describe("deleteEmployee", () => {
        it("should handle successful operation", async () => {
            const mockItems = {
                id: "1",
                name: "Alice Johnson",
                position: "Branch Manager",
                department: "Management",
                email: "alice.johnson@pixell-river.com",
                phone: "604-555-0148",
                branchID: "1"
            };

            (employeeService.deleteEmployee as jest.Mock).mockResolvedValue(mockItems);

            mockReq = { params: {id: "1"}, body: {} };
            await employeeController.deleteEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee Deleted",
            });
        });
    });

    describe("getBranchEmployees", () => {
        it("should handle successful operation", async () => {
            const mockItems: employeeService.Employee[] = [
                { id: "1", name: "Alice Johnson", position: "Branch Manager", department: "Management", email: "alice.johnson@pixell-river.com", phone: "604-555-0148", branchID: "1"},
                { id: "2", name: "Amandeep Singh", position: "Customer Service Representative", department: "Customer Service", email: "amandeep.singh@pixell-river.com", phone: "780-555-0172", branchID: "2"},
                { id: "3", name: "Maria Garcia", position: "Loan Officer", department: "Loans", email: "maria.garcia@pixell-river.com", phone: "204-555-0193", branchID: "3"},
                { id: "4", name: "James Wilson", position: "IT Support Specialist", department: "IT", email: "james.wilson@pixell-river.com", phone: "604-555-0134	", branchID: "1"},
            ];

            (employeeService.getBranchEmployees as jest.Mock).mockResolvedValue(mockItems);

            mockReq = { params: {id: "1"}, body: {}};
            await employeeController.getBranchEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch Staff Found",
                data: mockItems,
            });
        });
    });

    describe("getDepartmentEmployees", () => {
        it("should handle successful operation", async () => {
            const mockItems: employeeService.Employee[] = [
                { id: "1", name: "Alice Johnson", position: "Branch Manager", department: "Management", email: "alice.johnson@pixell-river.com", phone: "604-555-0148", branchID: "1"},
                { id: "2", name: "Amandeep Singh", position: "Customer Service Representative", department: "Customer Service", email: "amandeep.singh@pixell-river.com", phone: "780-555-0172", branchID: "2"},
                { id: "3", name: "Maria Garcia", position: "Loan Officer", department: "Loans", email: "maria.garcia@pixell-river.com", phone: "204-555-0193", branchID: "3"},
                { id: "4", name: "James Wilson", position: "IT Support Specialist", department: "IT", email: "james.wilson@pixell-river.com", phone: "604-555-0134	", branchID: "1"},
                { id: "8", name: "Chen Wei", position: "Senior Loan Officer", department: "Loans", email: "chen.wei@pixell-river.com", phone: "204-555-0218", branchID: "5"},
            ];

            (employeeService.getDepartmentEmployees as jest.Mock).mockResolvedValue(mockItems);

            mockReq = { params: {department: "Loans"}, body: {}};
            await employeeController.getDepartmentEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Department Staff Found",
                data: mockItems,
            });
        });
    });
});
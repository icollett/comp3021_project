import { Request, Response, NextFunction } from "express";
import * as branchController from "../src/api/v1/controllers/branchController";
import * as branchService from "../src/api/v1/services/branchService";
import { Branch } from "../src/api/v1/models/branchModel";


jest.mock("../src/api/v1/services/branchService");

describe("Branch Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        mockNext = jest.fn();
    });

    describe("getAllBranches", () => {
        it("should handle successful operation", async () => {
            const mockItems: Branch[] = [
                {
                    id: "1",
                    name: "Vancouver Branch",
                    address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
                    phone: "604-456-0022",
                }
            ];

            (branchService.getAllBranches as jest.Mock).mockResolvedValue(mockItems);

            await branchController.getAllBranches(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branches Retrieved",
                data: mockItems,
            });
        });
    });

    describe("createBranch", () => {
        it("should handle successful operation", async () => {
            const mockItems = {
                id: "1",
                name: "Vancouver Branch",
                address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
                phone: "604-456-0022",
            };

            (branchService.createBranch as jest.Mock).mockResolvedValue(mockItems);

            mockReq = { params: {}, body: {name: "Vancouver Branch", address: "1300 Burrard St, Vancouver, BC, V6Z 2C7", phone: "604-456-0022",} };
            await branchController.createBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch Created",
                data: mockItems,
            });
        });
    });

    describe("getBranch", () => {
        it("should handle successful operation", async () => {
            const mockItems = {
                id: "1",
                name: "Vancouver Branch",
                address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
                phone: "604-456-0022",
            };

            (branchService.getBranch as jest.Mock).mockResolvedValue(mockItems);

            mockReq = { params: {id: "1"}, body: {} };
            await branchController.getBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch Found",
                data: mockItems
            });
        });
    });

    describe("updateBranch", () => {
        it("should handle successful operation", async () => {
            const mockItems = {
                name: "Sydney Branch",
                phone: "604-456-0022",
            };

            (branchService.updateBranch as jest.Mock).mockResolvedValue(mockItems);

            mockReq = { params: {id: "1"}, body: mockItems };
            await branchController.updateBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch Updated",
                data: mockItems,
            });
        });
    });

    describe("deleteBranch", () => {
        it("should handle successful operation", async () => {
            const mockItems = {
                id: "1",
                name: "Vancouver Branch",
                address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
                phone: "604-456-0022",
            };

            (branchService.deleteBranch as jest.Mock).mockResolvedValue(mockItems);

            mockReq = { params: {id: "1"}, body: {} };
            await branchController.deleteBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch Deleted",
            });
        });
    });
});
import * as repositoryModule from "../src/api/v1/repositories/firestoreRepository";
import * as employeeService from "../src/api/v1/services/employeeService";
import { Employee } from "../src/api/v1/models/employeeModel";
import { mock } from "node:test";
import { ServiceError, ValidationError } from "../src/api/v1/middleware/errorHandler";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepository");
const COLLECTION: string = 'Employees';

describe("Employee Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createEmployee', () => {
        it('should perform operation successfully', async () => {
            // Arrange
            const mockInput = {
                name: "Alice Johnson",
                position: "Branch Manager",
                department: "Management",
                email: "alice.johnson@pixell-river.com",
                phone: "604-555-0148",
                branchID: "1"
            };
            const mockRepositoryResponse = "1";
            (repositoryModule.createDocument as jest.Mock).mockResolvedValue(mockRepositoryResponse);

            // Act
            const result: Employee = await employeeService.createEmployee(mockInput);

            // Assert
            expect(repositoryModule.createDocument).toHaveBeenCalledWith(COLLECTION, mockInput);
            expect(result).toEqual({id: mockRepositoryResponse, ...mockInput});
        });

        it('should handle errors', async () => {
            // Arrange
            const mockInput = {
                name: "",
                email: "alice.johnson.pixell-river.com",
                phone: "604-555-0148",
                branchID: ""
            };
            const mockError = new ServiceError('Test error');
            (repositoryModule.createDocument as jest.Mock).mockRejectedValue(mockError);

            // Act & Assert
            await expect(employeeService.createEmployee(mockInput)).rejects.toThrow(ServiceError);
        });
    });
    
    // describe("createEmployee", () => {
    //     it("should handle successful operation", async () => {
    //         const testEmployee: any = {
    //             name: "Alice Johnson",
    //             position: "Branch Manager",
    //             department: "Management",
    //             email: "alice.johnson@pixell-river.com",
    //             phone: "604-555-0148",
    //             branchID: "1"
    //         };

    //         const result: Employee = await employeeService.createEmployee(testEmployee);
    //         expect(employees[0]).toBe(result);
    //     });
    // });

    // describe("getAllEmployees", () => {
    //     it("should handle successful operation", async () => {
    //         const expected: Employee[] = [{
    //             id: "1",
    //             name: "Alice Johnson",
    //             position: "Branch Manager",
    //             department: "Management",
    //             email: "alice.johnson@pixell-river.com",
    //             phone: "604-555-0148",
    //             branchID: "1"
    //         }];

    //         const result: Employee[] = await employeeService.getAllEmployees();
    //         expect(expected).toStrictEqual(result);
    //     });
    // });

    // describe("getEmployee", () => {
    //     it("should handle successful operation", async () => {
    //         const expected: Employee = {
    //             id: "1",
    //             name: "Alice Johnson",
    //             position: "Branch Manager",
    //             department: "Management",
    //             email: "alice.johnson@pixell-river.com",
    //             phone: "604-555-0148",
    //             branchID: "1"
    //         };

    //         const result: Employee = await employeeService.getEmployee("1");
    //         expect(expected).toStrictEqual(result);
    //     });
    // });

    // describe("updateEmployee", () => {
    //     it("should handle successful operation", async () => {
    //         const expected: Employee = {
    //             id: "1",
    //             name: "Alice May",
    //             position: "Branch Manager",
    //             department: "Management",
    //             email: "alice.may@pixell-river.com",
    //             phone: "604-555-0148",
    //             branchID: "1"
    //         };

    //         const result: Employee = await employeeService.updateEmployee("1", {name: "Alice May", email: "alice.may@pixell-river.com"});
    //         expect(expected).toStrictEqual(result);
    //     });
    // });

    // describe("deleteEmployee", () => {
    //     it("should handle successful operation", async () => {
    //         const expected: Employee[] = [];

    //         await employeeService.deleteEmployee("1");
    //         expect(employees).toStrictEqual(expected);
    //     });
    // });

    // describe("getBranchEmployees", () => {
    //     it("should handle successful operation", async () => {
    //         const expected: Employee[] = [
    //             {
    //                 id: "1",
    //                 name: "Alice Johnson",
    //                 position: "Branch Manager",
    //                 department: "Management",
    //                 email: "alice.johnson@pixell-river.com",
    //                 phone: "604-555-0148",
    //                 branchID: "1"
    //             },
    //             { 
    //                 id: "4",
    //                 name: "James Wilson",
    //                 position: "IT Support Specialist",
    //                 department: "IT",
    //                 email: "james.wilson@pixell-river.com",
    //                 phone: "604-555-0134",
    //                 branchID: "1"
    //             },

    //         ];
    //         await employeeService.createEmployee({name: "Alice Johnson", position: "Branch Manager", department: "Management", email: "alice.johnson@pixell-river.com", phone: "604-555-0148", branchID: "1"});
    //         await employeeService.createEmployee({name: "Amandeep Singh", position: "Customer Service Representative", department: "Customer Service", email: "amandeep.singh@pixell-river.com", phone: "780-555-0172", branchID: "2"});
    //         await employeeService.createEmployee({name: "Maria Garcia", position: "Loan Officer", department: "Loans", email: "maria.garcia@pixell-river.com", phone: "204-555-0193", branchID: "3"});
    //         await employeeService.createEmployee({name: "James Wilson", position: "IT Support Specialist", department: "IT", email: "james.wilson@pixell-river.com", phone: "604-555-0134", branchID: "1"});

    //         const result: Employee[] = await employeeService.getBranchEmployees("1");
    //         expect(expected).toStrictEqual(result);
    //     });
    // });

    // describe("getDepartmentEmployees", () => {
    //     it("should handle successful operation", async () => {
    //         const expected: Employee[] = [
    //             { id: "3", name: "Maria Garcia", position: "Loan Officer", department: "Loans", email: "maria.garcia@pixell-river.com", phone: "204-555-0193", branchID: "3"},
    //             { id: "5", name: "Chen Wei", position: "Senior Loan Officer", department: "Loans", email: "chen.wei@pixell-river.com", phone: "204-555-0218", branchID: "5"},
    //         ];

    //         await employeeService.createEmployee({name: "Chen Wei", position: "Senior Loan Officer", department: "Loans", email: "chen.wei@pixell-river.com", phone: "204-555-0218", branchID: "5"});
            
    //         const result: employeeService.DepartmentEmployees = await employeeService.getDepartmentEmployees("Loans");
    //         expect(expected).toStrictEqual(result.staff);
    //     });
    // });
});
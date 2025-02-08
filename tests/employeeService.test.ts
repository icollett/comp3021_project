import * as employeeService from "../src/api/v1/services/employeeService";
import { employees } from "../src/api/v1/services/employeeService";

describe("Employee Service", () => {
    
    describe("createEmployee", () => {
        it("should handle successful operation", async () => {
            const testEmployee: any = {
                name: "Alice Johnson",
                position: "Branch Manager",
                department: "Management",
                email: "alice.johnson@pixell-river.com",
                phone: "604-555-0148",
                branchID: "1"
            };

            const result: employeeService.Employee = await employeeService.createEmployee(testEmployee);
            expect(employees[0]).toBe(result);
        });
    });

    describe("getAllEmployees", () => {
        it("should handle successful operation", async () => {
            const expected: employeeService.Employee[] = [{
                id: "1",
                name: "Alice Johnson",
                position: "Branch Manager",
                department: "Management",
                email: "alice.johnson@pixell-river.com",
                phone: "604-555-0148",
                branchID: "1"
            }];

            const result: employeeService.Employee[] = await employeeService.getAllEmployees();
            expect(expected).toStrictEqual(result);
        });
    });

    describe("getEmployee", () => {
        it("should handle successful operation", async () => {
            const expected: employeeService.Employee = {
                id: "1",
                name: "Alice Johnson",
                position: "Branch Manager",
                department: "Management",
                email: "alice.johnson@pixell-river.com",
                phone: "604-555-0148",
                branchID: "1"
            };

            const result: employeeService.Employee = await employeeService.getEmployee("1");
            expect(expected).toStrictEqual(result);
        });
    });

    describe("updateEmployee", () => {
        it("should handle successful operation", async () => {
            const expected: employeeService.Employee = {
                id: "1",
                name: "Alice May",
                position: "Branch Manager",
                department: "Management",
                email: "alice.may@pixell-river.com",
                phone: "604-555-0148",
                branchID: "1"
            };

            const result: employeeService.Employee = await employeeService.updateEmployee("1", {name: "Alice May", email: "alice.may@pixell-river.com"});
            expect(expected).toStrictEqual(result);
        });
    });

    describe("deleteEmployee", () => {
        it("should handle successful operation", async () => {
            const expected: employeeService.Employee[] = [];

            await employeeService.deleteEmployee("1");
            expect(employees).toStrictEqual(expected);
        });
    });

    describe("getBranchEmployees", () => {
        it("should handle successful operation", async () => {
            const expected: employeeService.Employee[] = [
                {
                    id: "1",
                    name: "Alice Johnson",
                    position: "Branch Manager",
                    department: "Management",
                    email: "alice.johnson@pixell-river.com",
                    phone: "604-555-0148",
                    branchID: "1"
                },
                { 
                    id: "4",
                    name: "James Wilson",
                    position: "IT Support Specialist",
                    department: "IT",
                    email: "james.wilson@pixell-river.com",
                    phone: "604-555-0134",
                    branchID: "1"
                },

            ];

            employeeService.clearEmployeees();

            await employeeService.createEmployee({name: "Alice Johnson", position: "Branch Manager", department: "Management", email: "alice.johnson@pixell-river.com", phone: "604-555-0148", branchID: "1"});
            await employeeService.createEmployee({name: "Amandeep Singh", position: "Customer Service Representative", department: "Customer Service", email: "amandeep.singh@pixell-river.com", phone: "780-555-0172", branchID: "2"});
            await employeeService.createEmployee({name: "Maria Garcia", position: "Loan Officer", department: "Loans", email: "maria.garcia@pixell-river.com", phone: "204-555-0193", branchID: "3"});
            await employeeService.createEmployee({name: "James Wilson", position: "IT Support Specialist", department: "IT", email: "james.wilson@pixell-river.com", phone: "604-555-0134", branchID: "1"});

            const result: employeeService.BranchEmployees = await employeeService.getBranchEmployees("1");
            expect(expected).toStrictEqual(result.staff);
        });
    });

    describe("getDepartmentEmployees", () => {
        it("should handle successful operation", async () => {
            const expected: employeeService.Employee[] = [
                { id: "3", name: "Maria Garcia", position: "Loan Officer", department: "Loans", email: "maria.garcia@pixell-river.com", phone: "204-555-0193", branchID: "3"},
                { id: "5", name: "Chen Wei", position: "Senior Loan Officer", department: "Loans", email: "chen.wei@pixell-river.com", phone: "204-555-0218", branchID: "5"},
            ];

            await employeeService.createEmployee({name: "Chen Wei", position: "Senior Loan Officer", department: "Loans", email: "chen.wei@pixell-river.com", phone: "204-555-0218", branchID: "5"});
            
            const result: employeeService.DepartmentEmployees = await employeeService.getDepartmentEmployees("Loans");
            expect(expected).toStrictEqual(result.staff);
        });
    });
});
jest.mock("../src/api/v1/repositories/firestoreRepository", () => ({
    createDocument: jest.fn(),
    getDocuments: jest.fn(),
    getDocumentById: jest.fn(),
    updateDocument: jest.fn(),
    deleteDocument: jest.fn(),
    fetchDocsByField: jest.fn(),
    runTransaction: jest.fn(),
}));

import * as repositoryModule from "../src/api/v1/repositories/firestoreRepository";
import * as employeeService from "../src/api/v1/services/employeeService";
import { Employee } from "../src/api/v1/models/employeeModel";
import { RepositoryError, ServiceError, ValidationError } from "../src/api/v1/middleware/errorHandler";
import {MockFirestoreData, MockFirestoreDocumentSnapshot, MockQuerySnapshot} from "./utils/mockFirebaseHelper"

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepository");
const COLLECTION: string = 'Employees';

describe("Employee Service", () => {
    beforeAll(() => {
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

        it('should handle ServiceErrors', async () => {
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

        it('should handle RepositoryErrors', async () => {
            // Arrange
            const mockInput = {
                name: "Alice Johnson",
                position: "Branch Manager",
                department: "Management",
                email: "alice.johnson@pixell-river.com",
                phone: "604-555-0148",
                branchID: "1"
            };

            const mockError = new RepositoryError('Test error');
            (repositoryModule.createDocument as jest.Mock).mockRejectedValue(mockError);

            // Act & Assert
            await expect(employeeService.createEmployee(mockInput)).rejects.toThrow(RepositoryError);
        });
    });
    
    describe('getAllEmployees', () => {
        it('should perform operation successfully', async () => {
            // Arrange
            const expected: Employee[] = [
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
                    id: "2",
                    name: "John Oliver",
                    position: "TV Show Host",
                    department: "Production",
                    email: "john@look-like-a-bird.com",
                    phone: "222-2222",
                    branchID: "1"
                }
            ];
            const data1: MockFirestoreData = {
                name: "Alice Johnson",
                position: "Branch Manager",
                department: "Management",
                email: "alice.johnson@pixell-river.com",
                phone: "604-555-0148",
                branchID: "1"
            };
            
            const data2: MockFirestoreData = {
                name: "John Oliver",
                position: "TV Show Host",
                department: "Production",
                email: "john@look-like-a-bird.com",
                phone: "222-2222",
                branchID: "1"
            };

            const doc1: MockFirestoreDocumentSnapshot = {
                data: () => data1,
                id: "1",
            };

            const doc2: MockFirestoreDocumentSnapshot = {
                data: () => data2,
                id: "2",
            };

            const mockRepositoryResponse: MockQuerySnapshot = {
                docs: [doc1, doc2],
                forEach: jest.fn(),
                empty: false,
                size: 2,
            };

            (repositoryModule.getDocuments as jest.Mock).mockResolvedValue(mockRepositoryResponse);

            // Act
            const result: Employee[] = await employeeService.getAllEmployees();

            // Assert
            expect(repositoryModule.getDocuments).toHaveBeenCalledWith(COLLECTION);
            expect(result).toEqual(expected);
        });
    });

    describe('getEmployee', () => {
        it('should perform operation successfully', async () => {
            // Arrange
            const mockInput: string = "1";
            const expected: Employee = {
                id: "1",
                name: "Alice Johnson",
                position: "Branch Manager",
                department: "Management",
                email: "alice.johnson@pixell-river.com",
                phone: "604-555-0148",
                branchID: "1"
            };

            const data1: MockFirestoreData = {
                name: "Alice Johnson",
                position: "Branch Manager",
                department: "Management",
                email: "alice.johnson@pixell-river.com",
                phone: "604-555-0148",
                branchID: "1"
            };

            const mockRepositoryResponse: MockFirestoreDocumentSnapshot = {
                data: () => data1,
                id: "1",
            };

            (repositoryModule.getDocumentById as jest.Mock).mockResolvedValue(mockRepositoryResponse);

            // Act
            const result: Employee = await employeeService.getEmployee(mockInput);

            // Assert
            expect(repositoryModule.getDocumentById).toHaveBeenCalledWith(COLLECTION, mockInput);
            expect(result).toEqual(expected);
        });

        it('should handle ServiceErrors', async () => {
            // Arrange
            const mockInput: string = "1";

            (repositoryModule.getDocumentById as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(employeeService.getEmployee(mockInput)).rejects.toThrow(ServiceError);
        });

        it('should handle RepositoryErrors', async () => {
            // Arrange
            const mockInput:string = "1";
            const mockError = new RepositoryError('Test error');
            (repositoryModule.getDocumentById as jest.Mock).mockRejectedValue(mockError);

            // Act & Assert
            await expect(employeeService.getEmployee(mockInput)).rejects.toThrow(RepositoryError);
        });
    });

    describe('updateEmployee', () => {
        it('should perform operation successfully', async () => {
            // Arrange
            const mockID: string = "1";
            const mockInput: Partial<Employee> = {
                id: "1",
                name: "Stephen Colbert",
                position: "Late Night host"
            };

            // Act
            const result: Employee = await employeeService.updateEmployee(mockID, mockInput);

            // Assert
            expect(repositoryModule.updateDocument).toHaveBeenCalledWith(COLLECTION, mockID, mockInput);
            expect(result).toEqual(mockInput);
        });

        it('should handle invalid inputs', async () => {
            // Arrange
            const mockID: string = "1";
            const mockInput: Partial<Employee> = {
                name: "Stephen Colbert",
            };

            const mockError = new ValidationError('Test error');
            (repositoryModule.updateDocument as jest.Mock).mockRejectedValue(mockError);

            // Act & Assert
            await expect(employeeService.updateEmployee(mockID, mockInput)).rejects.toThrow(ValidationError);
        });

        it('should handle RepositoryError', async () => {
            // Arrange
            const mockID: string = "1";
            const mockInput: Partial<Employee> = {
                id: "1",
                name: "Stephen Colbert",
                position: "Late Night host"
            };
            const mockError = new RepositoryError('Test error');
            (repositoryModule.updateDocument as jest.Mock).mockRejectedValue(mockError);

            // Act & Assert
            await expect(employeeService.updateEmployee(mockID, mockInput)).rejects.toThrow(RepositoryError);
        });
    });

    describe('deleteEmployee', () => {
        it('should perform operation successfully', async () => {
            // Arrange
            const mockID: string = "1";

            // Act
            await employeeService.deleteEmployee(mockID);

            // Assert
            expect(repositoryModule.deleteDocument).toHaveBeenCalledWith(COLLECTION, mockID);
        });

        it('should handle RepositoryError', async () => {
            // Arrange
            const mockID: string = "1";
            const mockError = new RepositoryError('Test error');

            // Act & Assert
            (repositoryModule.deleteDocument as jest.Mock).mockRejectedValue(mockError);

            await expect(employeeService.deleteEmployee(mockID)).rejects.toThrow(RepositoryError);
            expect(repositoryModule.deleteDocument).toHaveBeenCalledWith(COLLECTION, mockID);
        });
    });

    describe('getBranchEmployees', () => {
        it('should perform operation successfully', async () => {
            // Arrange
            const mockID: string = "1";
            const expected: Employee[] = [
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
                    id: "2",
                    name: "John Oliver",
                    position: "TV Show Host",
                    department: "Production",
                    email: "john@look-like-a-bird.com",
                    phone: "222-2222",
                    branchID: "1"
                }
            ];
            const data1: MockFirestoreData = {
                name: "Alice Johnson",
                position: "Branch Manager",
                department: "Management",
                email: "alice.johnson@pixell-river.com",
                phone: "604-555-0148",
                branchID: "1"
            };
            
            const data2: MockFirestoreData = {
                name: "John Oliver",
                position: "TV Show Host",
                department: "Production",
                email: "john@look-like-a-bird.com",
                phone: "222-2222",
                branchID: "1"
            };

            const doc1: MockFirestoreDocumentSnapshot = {
                data: () => data1,
                id: "1",
            };

            const doc2: MockFirestoreDocumentSnapshot = {
                data: () => data2,
                id: "2",
            };

            const mockRepositoryResponse: MockQuerySnapshot = {
                docs: [doc1, doc2],
                forEach: jest.fn(),
                empty: false,
                size: 2,
            };

            (repositoryModule.fetchDocsByField as jest.Mock).mockResolvedValue(mockRepositoryResponse);

            // Act
            const result: Employee[] = await employeeService.getBranchEmployees(mockID);

            // Assert
            expect(repositoryModule.fetchDocsByField).toHaveBeenCalledWith(COLLECTION, "branchID", mockID);
            expect(result).toEqual(expected);
        });

        it('should handle RepositoryError', async () => {
            // Arrange
            const mockID: string = "1";
            const mockError = new RepositoryError('Test error');

            // Act & Assert
            (repositoryModule.fetchDocsByField as jest.Mock).mockRejectedValue(mockError);

            await expect(employeeService.getBranchEmployees(mockID)).rejects.toThrow(RepositoryError);
            expect(repositoryModule.fetchDocsByField).toHaveBeenCalledWith(COLLECTION, "branchID", mockID);
        });
    });

    describe('getDepartmentEmployees', () => {
        it('should perform operation successfully', async () => {
            // Arrange
            const deptName: string = "Loans";
            const expected: Employee[] = [
                { id: "3", name: "Maria Garcia", position: "Loan Officer", department: "Loans", email: "maria.garcia@pixell-river.com", phone: "204-555-0193", branchID: "3"},
                { id: "5", name: "Chen Wei", position: "Senior Loan Officer", department: "Loans", email: "chen.wei@pixell-river.com", phone: "204-555-0218", branchID: "5"},
            ];

            const data1: MockFirestoreData = {
                name: "Maria Garcia", position: "Loan Officer", department: "Loans", email: "maria.garcia@pixell-river.com", phone: "204-555-0193", branchID: "3"
            };
            
            const data2: MockFirestoreData = {
                name: "Chen Wei", position: "Senior Loan Officer", department: "Loans", email: "chen.wei@pixell-river.com", phone: "204-555-0218", branchID: "5"
            };

            const doc1: MockFirestoreDocumentSnapshot = {
                data: () => data1,
                id: "3",
            };

            const doc2: MockFirestoreDocumentSnapshot = {
                data: () => data2,
                id: "5",
            };

            const mockRepositoryResponse: MockQuerySnapshot = {
                docs: [doc1, doc2],
                forEach: jest.fn(),
                empty: false,
                size: 2,
            };

            (repositoryModule.fetchDocsByField as jest.Mock).mockResolvedValue(mockRepositoryResponse);

            // Act
            const result: Employee[] = await employeeService.getDepartmentEmployees(deptName);

            // Assert
            expect(repositoryModule.fetchDocsByField).toHaveBeenCalledWith(COLLECTION, "department", deptName);
            expect(result).toEqual(expected);
        });

        it('should handle RepositoryError', async () => {
            // Arrange
            const deptName: string = "Loans";
            const mockError = new RepositoryError('Test error');

            // Act & Assert
            (repositoryModule.fetchDocsByField as jest.Mock).mockRejectedValue(mockError);

            await expect(employeeService.getDepartmentEmployees(deptName)).rejects.toThrow(RepositoryError);
            expect(repositoryModule.fetchDocsByField).toHaveBeenCalledWith(COLLECTION, "department", deptName);
        });
    });

});
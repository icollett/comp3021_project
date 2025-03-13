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
import * as branchService from "../src/api/v1/services/branchService";
import { Branch } from "../src/api/v1/models/branchModel";
import { RepositoryError, ServiceError, ValidationError } from "../src/api/v1/middleware/errorHandler";
import {MockFirestoreData, MockFirestoreDocumentSnapshot, MockQuerySnapshot} from "./utils/mockFirebaseHelper"

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepository");
const COLLECTION: string = 'Branches';

describe("Branch Service", () => {
    beforeAll(() => {
        jest.clearAllMocks();
    });

    describe('createBranch', () => {
        it('should perform operation successfully', async () => {
            // Arrange
            const mockInput = {
                name: "Vancouver Branch",
                address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
                phone: "604-456-0022",
            };
            const mockRepositoryResponse = "1";
            (repositoryModule.createDocument as jest.Mock).mockResolvedValue(mockRepositoryResponse);

            // Act
            const result: Branch = await branchService.createBranch(mockInput);

            // Assert
            expect(repositoryModule.createDocument).toHaveBeenCalledWith(COLLECTION, mockInput);
            expect(result).toEqual({id: mockRepositoryResponse, ...mockInput});
        });

        it('should handle invalid input formats', async () => {
            // Arrange
            const mockInput = {
                name: "",
                address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
            };
            const mockError = new ServiceError('Test error');
            (repositoryModule.createDocument as jest.Mock).mockRejectedValue(mockError);

            // Act & Assert
            await expect(branchService.createBranch(mockInput)).rejects.toThrow(ServiceError);
        });

        it('should handle RepositoryErrors', async () => {
            // Arrange
            const mockInput = {
                name: "Vancouver Branch",
                address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
                phone: "604-456-0022",
            };

            const mockError = new RepositoryError('Test error');
            (repositoryModule.createDocument as jest.Mock).mockRejectedValue(mockError);

            // Act & Assert
            await expect(branchService.createBranch(mockInput)).rejects.toThrow(RepositoryError);
        });
    });

    describe('getAllBranches', () => {
        it('should perform operation successfully', async () => {
            // Arrange
            const expected: Branch[] = [
                {
                    id: "1",
                    name: "Vancouver Branch",
                    address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
                    phone: "604-456-0022",
                },
                {
                    id: "2",
                    name: "Winnipeg Branch",
                    address: "Main St.",
                    phone: "204-222-2222",
                }
            ];

            const data1: MockFirestoreData = {
                name: "Vancouver Branch",
                address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
                phone: "604-456-0022",
            };
            
            const data2: MockFirestoreData = {
                name: "Winnipeg Branch",
                address: "Main St.",
                phone: "204-222-2222",
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
            const result: Branch[] = await branchService.getAllBranches();

            // Assert
            expect(repositoryModule.getDocuments).toHaveBeenCalledWith(COLLECTION);
            expect(result).toEqual(expected);
        });
    });

    describe('getBranch', () => {
        it('should perform operation successfully', async () => {
            // Arrange
            const mockInput: string = "1";
            const expected: Branch = {
                id: "1",
                name: "Vancouver Branch",
                address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
                phone: "604-456-0022",
            };

            const data1: MockFirestoreData = {
                name: "Vancouver Branch",
                address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
                phone: "604-456-0022",
            };

            const mockRepositoryResponse: MockFirestoreDocumentSnapshot = {
                data: () => data1,
                id: "1",
            };

            (repositoryModule.getDocumentById as jest.Mock).mockResolvedValue(mockRepositoryResponse);

            // Act
            const result: Branch = await branchService.getBranch(mockInput);

            // Assert
            expect(repositoryModule.getDocumentById).toHaveBeenCalledWith(COLLECTION, mockInput);
            expect(result).toEqual(expected);
        });

        it('should handle ServiceErrors', async () => {
            // Arrange
            const mockInput: string = "1";

            (repositoryModule.getDocumentById as jest.Mock).mockResolvedValue(null);

            // Act & Assert
            await expect(branchService.getBranch(mockInput)).rejects.toThrow(ServiceError);
        });

        it('should handle RepositoryErrors', async () => {
            // Arrange
            const mockInput:string = "1";
            const mockError = new RepositoryError('Test error');
            (repositoryModule.getDocumentById as jest.Mock).mockRejectedValue(mockError);

            // Act & Assert
            await expect(branchService.getBranch(mockInput)).rejects.toThrow(RepositoryError);
        });
    });

    describe('updateBranch', () => {
        it('should perform operation successfully', async () => {
            // Arrange
            const mockID: string = "1";
            const mockInput: Partial<Branch> = {
                id: "1",
                name: "Sydney Branch",
            };

            // Act
            const result: Branch = await branchService.updateBranch(mockID, mockInput);

            // Assert
            expect(repositoryModule.updateDocument).toHaveBeenCalledWith(COLLECTION, mockID, mockInput);
            expect(result).toEqual(mockInput);
        });

        it('should handle invalid inputs', async () => {
            // Arrange
            const mockID: string = "1";
            const mockInput: Partial<Branch> = {
                name: "",
                address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
                phone: "604-456-0022",
            };

            const mockError = new ValidationError('Test error');
            (repositoryModule.updateDocument as jest.Mock).mockRejectedValue(mockError);

            // Act & Assert
            await expect(branchService.updateBranch(mockID, mockInput)).rejects.toThrow(ValidationError);
        });

        it('should handle RepositoryError', async () => {
            // Arrange
            const mockID: string = "1";
            const mockInput: Partial<Branch> = {
                id: "1",
                name: "Kelowna Branch",
                address: "Lakefront Dr.",
            };
            const mockError = new RepositoryError('Test error');
            (repositoryModule.updateDocument as jest.Mock).mockRejectedValue(mockError);

            // Act & Assert
            await expect(branchService.updateBranch(mockID, mockInput)).rejects.toThrow(RepositoryError);
        });
    });

    describe('deleteBranch', () => {
        it('should perform operation successfully', async () => {
            // Arrange
            const mockID: string = "1";

            // Act
            await branchService.deleteBranch(mockID);

            // Assert
            expect(repositoryModule.deleteDocument).toHaveBeenCalledWith(COLLECTION, mockID);
        });

        it('should handle RepositoryError', async () => {
            // Arrange
            const mockID: string = "1";
            const mockError = new RepositoryError('Test error');

            // Act & Assert
            (repositoryModule.deleteDocument as jest.Mock).mockRejectedValue(mockError);

            await expect(branchService.deleteBranch(mockID)).rejects.toThrow(RepositoryError);
            expect(repositoryModule.deleteDocument).toHaveBeenCalledWith(COLLECTION, mockID);
        });
    });
});
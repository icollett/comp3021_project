import { Branch } from "../models/branchModel";
import * as firestoreRepository from "../repositories/firestoreRepository";
import { branchSchema, branchUpdateSchema } from "../schemas/branchValidation";
import { validate } from "../middleware/validate";
import { ServiceError } from "../middleware/errorHandler";

const COLLECTION: string = 'Branches';

/**
 * @description Get all branches.
 * @returns {Promise<Branch[]>}
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    const snapshot: FirebaseFirestore.QuerySnapshot = await firestoreRepository.getDocuments(
        COLLECTION
    );

    return snapshot.docs.map((doc) => {
        const data: FirebaseFirestore.DocumentData = doc.data();
        return { id: doc.id, ...data } as Branch;
    });
};

/**
 * @description Create a new branch.
 * @param {Partial<Branch>} branch - The branch data.
 * @returns {Promise<Branch>}
 */
export const createBranch = async (branch: Partial<Branch>): Promise<Branch> => {
    try{
        validate(branchSchema, branch);
    }catch(error){
        throw new ServiceError(`Failed to validate branch creation.`);
    }
    const id: string = await firestoreRepository.createDocument(COLLECTION, branch);
    return { id, ...branch } as Branch;
};

/**
 * @description Find an existing branch using an ID.
 * @param {string} id - The ID of the branch to find.
 * @returns {Promise<Branch>}
 * @throws {Error} If the branch with the given ID is not found.
 */
export const getBranch = async (
    id: string
): Promise<Branch> => {
    const snapshot: FirebaseFirestore.DocumentSnapshot | null = await firestoreRepository.getDocumentById(
        COLLECTION,
        id
    );

    if(snapshot === null){
        throw new ServiceError(`Branch with ID ${id} not found`);
    }

    return { id, ...snapshot.data() } as Branch;
};

/**
 * @description Update an existing branch.
 * @param {string} id - The ID of the branch to update.
 * @param {Partial<Branch>} branch - The updated branch data.
 * @returns {Promise<Branch>}
 * @throws {Error} If the branch with the given ID is not found.
 */
export const updateBranch = async (
    id: string,
    branch: Partial<Branch>
): Promise<Branch> => {
    try{
        validate(branchUpdateSchema, {id, ...branch});
    }catch(error){
        throw new ServiceError(`Failed to validate branch update.`);
    }
    await firestoreRepository.updateDocument(COLLECTION, id, branch);
    return { id, ...branch } as Branch;
};

/**
 * @description Delete an branch.
 * @param {string} id - The ID of the branch to delete.
 * @returns {Promise<void>}
 * @throws {Error} If the branch with the given ID is not found.
 */
export const deleteBranch = async (id: string): Promise<void> => {
    await firestoreRepository.deleteDocument(COLLECTION, id);
}
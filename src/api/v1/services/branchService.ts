/**
 * @interface Branch
 * @description Represents an Branch object.
 */
export type Branch = {
    id: string,
    name: string,
    address: string,
    phone: string,
};

export const branches: Branch[] = [];
let idCounter: number = 0;

/**
 * @description Get all branches.
 * @returns {Promise<Branch[]>}
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    return branches;
};

/**
 * @description Create a new branch.
 * @param {{ name: string; address: string; phone: string; }} branch - The branch data.
 * @returns {Promise<Branch>}
 */
export const createBranch = async (branch: {
    name: string,
    address: string,
    phone: string,
}): Promise<Branch> => {
    idCounter += 1;
    const newBranch: Branch = { id: (idCounter).toString(), ...branch };

    // adding the new branch to the global scoped array of Items
    branches.push(newBranch);
    return newBranch;
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
    // retieve the branch's index from the branches array by comparing the branch ids
    const index: number = branches.findIndex((i) => i.id === id);
    // if the index is not found we expects a -1
    if (index === -1) {
        throw new Error(`Branch with ID ${id} not found`);
    }

    return branches[index];
};

/**
 * @description Update an existing branch.
 * @param {string} id - The ID of the branch to update.
 * @param {{ name: string; address: string; phone: string; }} branch - The updated branch data.
 * @returns {Promise<Branch>}
 * @throws {Error} If the branch with the given ID is not found.
 */
export const updateBranch = async (
    id: string,
    branch: {
        name?: string;
        address?: string;
        phone?: string;
    }
): Promise<Branch> => {
    // retieve the branch's index from the branches array by comparing the branch ids
    const index: number = branches.findIndex((i) => i.id === id);
    // if the index is not found we expects a -1
    if (index === -1) {
        throw new Error(`Branch with ID ${id} not found`);
    }

    const originalBranch: Branch = branches[index];
    // assign the new value of the found index
    branches[index] = { ...originalBranch, ...branch };

    return branches[index];
};

/**
 * @description Delete an branch.
 * @param {string} id - The ID of the branch to delete.
 * @returns {Promise<void>}
 * @throws {Error} If the branch with the given ID is not found.
 */
export const deleteBranch = async (id: string): Promise<void> => {
    const index: number = branches.findIndex((i) => i.id === id);
    if (index === -1) {
        throw new Error(`Branch with ID ${id} not found`);
    }

    branches.splice(index, 1);
}
import { Employee } from "../models/employeeModel";
import * as firestoreRepository from "../repositories/firestoreRepository";
import { employeeSchema, employeeUpdateSchema } from "../schemas/employeeValidation";
import { validate } from "../middleware/validate";
import { ServiceError } from "../middleware/errorHandler";

const COLLECTION: string = 'Employees';

/**
 * @description Get all employees.
 * @returns {Promise<Employee[]>}
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    const snapshot: FirebaseFirestore.QuerySnapshot = await firestoreRepository.getDocuments(
        COLLECTION
    );

    return snapshot.docs.map((doc) => {
        const data: FirebaseFirestore.DocumentData = doc.data();
        return { id: doc.id, ...data } as Employee;
    });
};

/**
 * @description Create a new employee.
 * @param {Partial<Employee>} employee - The employee data.
 * @returns {Promise<Employee>}
 */
export const createEmployee = async (employee: Partial<Employee>): Promise<Employee> => {
    try{
        validate(employeeSchema, employee);
    }catch(error){
        throw new ServiceError(`Failed to validate employee creation.`);
    }
    const id: string = await firestoreRepository.createDocument(COLLECTION, employee);
    return { id: id, ...employee} as Employee;
};

/**
 * @description Get an employee using their ID.
 * @param {string} id - The ID of the employee to find.
 * @returns {Promise<Employee>}
 * @throws {Error} If the employee with the given ID is not found.
 */
export const getEmployee = async (
    id: string
): Promise<Employee> => {
    const snapshot: FirebaseFirestore.DocumentSnapshot | null = await firestoreRepository.getDocumentById(
        COLLECTION,
        id
    );

    if(snapshot === null){
        throw new ServiceError(`Employee with ID ${id} not found`);
    }

    return { id: id, ...snapshot.data() } as Employee;
};

/**
 * @description Update an existing employee.
 * @param {string} id - The ID of the employee to update.
 * @param {Partial<Employee>} employee - The updated employee data.
 * @returns {Promise<Employee>}
 * @throws {Error} If the employee with the given ID is not found.
 */
export const updateEmployee = async (
    id: string,
    employee: Partial<Employee>
): Promise<Employee> => {
    try{
        validate(employeeUpdateSchema, employee);
    }catch(error){
        throw new ServiceError(`Failed to validate employee update.`);
    }
    await firestoreRepository.updateDocument(COLLECTION, id, employee);
    return { id: id, ...employee } as Employee;
};

/**
 * @description Delete an employee.
 * @param {string} id - The ID of the employee to delete.
 * @returns {Promise<void>}
 * @throws {Error} If the employee with the given ID is not found.
 */
export const deleteEmployee = async (id: string): Promise<void> => {
    await firestoreRepository.deleteDocument(COLLECTION, id);
};

/**
 * @description Get an list of Employees using their branch ID.
 * @param {string} branchID - The branch ID of the Employees to find.
 * @returns {Promise<BranchEmployees>}
 */
export const getBranchEmployees = async (
    branchID: string
): Promise<Employee[]> => {

    const snapshot: FirebaseFirestore.QuerySnapshot = await firestoreRepository.fetchDocsByField(
        COLLECTION,
        "branchID",
        branchID
    );

    return snapshot.docs.map((doc) => {
        const data: FirebaseFirestore.DocumentData = doc.data();
        return { id: doc.id, ...data } as Employee;
    });
};

/**
 * @description Get an list of Employees using their department name.
 * @param {string} department - The name of the department to get the staff list of.
 * @returns {Promise<DepartmentEmployees>}
 */
export const getDepartmentEmployees = async (
    department: string
): Promise<Employee[]> => {

    const snapshot: FirebaseFirestore.QuerySnapshot = await firestoreRepository.fetchDocsByField(
        COLLECTION,
        "department",
        department
    );

    return snapshot.docs.map((doc) => {
        const data: FirebaseFirestore.DocumentData = doc.data();
        return { id: doc.id, ...data } as Employee;
    });
};
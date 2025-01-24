/**
 * @interface Employee
 * @description Represents an Employee object.
 */
export type Employee = {
    id: string,
    name: string,
    position: string,
    department: string,
    email: string,
    phone: string,
    branchID: string,
};

const employees: Employee[] = [];

/**
 * @description Get all employees.
 * @returns {Promise<Employee[]>}
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    return employees;
};
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

/**
 * @description Create a new employee.
 * @param {{ name: string; description: string; }} employee - The employee data.
 * @returns {Promise<Employee>}
 */
export const createEmployee = async (employee: {
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    branchID: string;
}): Promise<Employee> => {
    const newEmployee: Employee = { id: (employees.length +1).toString(), ...employee };

    // adding the new employee to the global scoped array of Items
    employees.push(newEmployee);
    return newEmployee;
};
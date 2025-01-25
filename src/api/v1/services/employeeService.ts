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
 * @param {{ name: string; position: string; department: string; email: string; phone: string; branchID: string; }} employee - The employee data.
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

/**
 * @description Update an existing employee.
 * @param {string} id - The ID of the employee to update.
 * @param {{ name: string; description: string; }} employee - The updated employee data.
 * @returns {Promise<Employee>}
 * @throws {Error} If the employee with the given ID is not found.
 */
export const updateEmployee = async (
    id: string,
    employee: {
        name?: string;
        position?: string;
        department?: string;
        email?: string;
        phone?: string;
        branchID?: string;
    }
): Promise<Employee> => {
    // retieve the employee's index from the employees array by comparing the employee ids
    const index: number = employees.findIndex((i) => i.id === id);
    // if the index is not found we expects a -1
    if (index === -1) {
        throw new Error(`Employee with ID ${id} not found`);
    }

    const originalEmployee = employees[index];
    // assign the new value of the found index
    employees[index] = { ...originalEmployee, ...employee };

    return employees[index];
};
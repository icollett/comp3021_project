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

/**
 * @interface BranchEmployees
 * @description Represents an list of Employees working at a certain branch.
 */
export type BranchEmployees = {
    staff: Employee[]
};

/**
 * @interface DepartmentEmployees
 * @description Represents an list of Employees working in a certain department.
 */
export type DepartmentEmployees = {
    staff: Employee[]
};

const employees: Employee[] = [];
let idCounter: number = 0;

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
    idCounter += 1;
    const newEmployee: Employee = { id: (idCounter).toString(), ...employee };

    // adding the new employee to the global scoped array of Items
    employees.push(newEmployee);
    return newEmployee;
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
    // retieve the employee's index from the employees array by comparing the employee ids
    const index: number = employees.findIndex((i) => i.id === id);
    // if the index is not found we expects a -1
    if (index === -1) {
        throw new Error(`Employee with ID ${id} not found`);
    }

    return employees[index];
};

/**
 * @description Update an existing employee.
 * @param {string} id - The ID of the employee to update.
 * @param {{ name: string; position: string; department: string; email: string; phone: string; branchID: string; }} employee - The updated employee data.
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

    const originalEmployee: Employee = employees[index];
    // assign the new value of the found index
    employees[index] = { ...originalEmployee, ...employee };

    return employees[index];
};

/**
 * @description Delete an employee.
 * @param {string} id - The ID of the employee to delete.
 * @returns {Promise<void>}
 * @throws {Error} If the employee with the given ID is not found.
 */
export const deleteEmployee = async (id: string): Promise<void> => {
    const index: number = employees.findIndex((i) => i.id === id);
    if (index === -1) {
        throw new Error(`Employee with ID ${id} not found`);
    }

    employees.splice(index, 1);
};

/**
 * @description Get an list of Employees using their branch ID.
 * @param {string} id - The branch ID of the Employees to find.
 * @returns {Promise<BranchEmployees>}
 */
export const getBranchEmployees = async (
    id: string
): Promise<BranchEmployees> => {

    const branchEmployees: BranchEmployees = {staff: []};
    for (const element of employees) {
        if (element.id === id)
            branchEmployees.staff.push(element);
    }

    return branchEmployees;
};

/**
 * @description Get an list of Employees using their department name.
 * @param {string} department - The name of the department to get the staff list of.
 * @returns {Promise<DepartmentEmployees>}
 */
export const getDepartmentEmployees = async (
    department: string
): Promise<DepartmentEmployees> => {

    const departmentEmployees: DepartmentEmployees = {staff: []};
    for (const element of employees) {
        if (element.department === department)
            departmentEmployees.staff.push(element);
    }

    return departmentEmployees;
};
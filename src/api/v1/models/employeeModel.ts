/**
 * @interface Employee
 * @description Represents an Employee object.
 * 
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for an Employee.
 *         name:
 *           type: string
 *           description: The name of an employee.
 *         position:
 *           type: string
 *           description: Position title of an employee.
 *         department:
 *           type: string
 *           description: Company department the employee works in.
 *         email:
 *           type: string
 *           description: Work email of an employee.
 *         phone:
 *           type: string
 *           description: Work phone number of an employee.
 *         branchID:
 *           type: string
 *           description: Branch ID where the employee works.
 *
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
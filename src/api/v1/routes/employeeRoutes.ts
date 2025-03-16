import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";

import { validateRequest } from "../middleware/validate";
import { employeeSchema, employeeUpdateSchema } from "../schemas/employeeValidation";

// express Router instance created. This instance will group all the employee-related routes.
const router: Router = express.Router();

/**
 * @route GET /
 * @description Get a list of all employees.
 * 
 * @openapi
 * /api/v1/employees/:
 *   get:
 *     summary: Fetch a list of all current employees.
 *     tags: [Employee]
 *     responses:
 *       200:
 *         description: A list of employee objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/", employeeController.getAllEmployees);

/**
 * @route POST /
 * @description Create a new employee.
 * 
 * @openapi
 * /api/v1/employees/:
 *   post:
 *     summary: Create a new employee.
 *     tags: [Employee]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               department:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               branchID:
 *                 type: string
 *         description: Information needed to create an Employee.
 *     responses:
 *       200:
 *         description: The employee with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 */
router.post("/", validateRequest(employeeSchema), employeeController.createEmployee);

/**
 * @route GET /:id
 * @description Find an employee by ID.
 * @note This could be a bit of information I want to find
 *
 * @openapi
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Find an employee by an ID value.
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the employee to find
 *     responses:
 *       200:
 *         description: The employee with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 */
router.get("/:id", employeeController.getEmployee);

/**
 * @route PUT /:id
 * @description Update an existing employee.
 * @note This could be a bit of information I want to add
 *
 * @openapi
 * /api/v1/employees/{id}:
 *   put:
 *     summary: Update an existing employee
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the employee to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               department:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               branchID:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated employee
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 */
router.put("/:id", validateRequest(employeeUpdateSchema), employeeController.updateEmployee);

/**
 * @route DELETE /:id
 * @description Delete an employee.
 * @openapi
 * /api/v1/employees/{id}:
 *   delete:
 *     summary: Delete an existing Employee
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the employee to delete
 *     responses:
 *       200:
 *         description: Employee deleted.
 */
router.delete("/:id", employeeController.deleteEmployee);

/**
 * @route GET /branch/:id
 * @description Find employees by branchID.
 * @note This could be a bit of information I want to find
 *
 * @openapi
 * /api/v1/employees/branch/{id}:
 *   get:
 *     summary: Find all employees that work at branchID location.
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Branch ID of the location you want the staff list of.
 *     responses:
 *       200:
 *         description: A collection of Employees that work at branch location ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/branch/:id", employeeController.getBranchEmployees);

/**
 * @route GET /department/:id
 * @description Find employees by department name.
 * @note This could be a bit of information I want to find
 *
 * @openapi
 * /api/v1/employees/department/{department}:
 *   get:
 *     summary: Find all employees that work in a department.
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: department
 *         schema:
 *           type: string
 *         required: true
 *         description: Department name you want the staff list of.
 *     responses:
 *       200:
 *         description: A collection of Employees that work in said department.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/department/:department", employeeController.getDepartmentEmployees);

export default router;
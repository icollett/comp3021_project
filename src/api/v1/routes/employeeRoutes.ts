import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";

// express Router instance created. This instance will group all the employee-related routes.
const router: Router = express.Router();

/**
 * @route GET /
 * @description Get all employees.
 */
router.get("/", employeeController.getAllEmployees);

/**
 * @route POST /
 * @description Create a new employee.
 */
router.post("/", employeeController.createEmployee);

/**
 * @route GET /:id
 * @description Find an employee by ID.
 * @note This could be a bit of information I want to find
 *
 * @openapi
 * /api/v1/employees/{id}:
 *   put:
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
 *         description: The updated employee
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
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated employee
 */
router.put("/:id", employeeController.updateEmployee);

/**
 * @route DELETE /:id
 * @description Delete an employee.
 */
router.delete("/:id", employeeController.deleteEmployee);

/**
 * @route GET /branch/:id
 * @description Find employees by branchID.
 * @note This could be a bit of information I want to find
 *
 * @openapi
 * /api/v1/employees/branch/{id}:
 *   put:
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
 *         description: A coollection of Employees that work at branch location ID.
 */
router.get("/branch/:id", employeeController.getBranchEmployees);

export default router;
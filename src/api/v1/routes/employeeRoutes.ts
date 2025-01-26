import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";

// express Router instance created. This instance will group all the item-related routes.
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
 * @route PUT /:id
 * @description Update an existing item.
 * @note This couyd be a bit of information I want to add
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
 * @description Delete an item.
 */
router.delete("/:id", employeeController.deleteEmployee);

export default router;
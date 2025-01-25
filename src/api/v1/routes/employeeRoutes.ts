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

export default router;
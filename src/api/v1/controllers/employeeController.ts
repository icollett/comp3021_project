import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeService";
import type { Employee } from "../services/employeeService";

/**
 * @description Get all Employees.
 * @route GET /
 * @returns {Promise<void>}
 */
export const getAllEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employees: Employee[] = await employeeService.getAllEmployees();

        res.status(200).json({ message: "Employees Retrieved", data: employees });
    } catch (error) {
        next(error);
    }
};

/**
 * @description Create a new employee.
 * @route POST /
 * @returns {Promise<void>}
 */
export const createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // call the employeeService by passing the body of the request
        const newEmployee: Employee = await employeeService.createEmployee(req.body);

        res.status(201).json({ message: "Employee Created", data: newEmployee });
    } catch (error) {
        next(error);
    }
};

/**
 * @description Update an existing employee.
 * @route PUT /:id
 * @returns {Promise<void>}
 */
export const updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // call the itemService by passing the id from thge url path and the body of the request
        const updatedEmployee: Employee = await employeeService.updateEmployee(
            req.params.id,
            req.body
        );

        res.status(200).json({ message: "Employee Updated", data: updatedEmployee });
    } catch (error) {
        next(error);
    }
};

/**
 * @description Delete an employee.
 * @route DELETE /:id
 * @returns {Promise<void>}
 */
export const deleteEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await employeeService.deleteEmployee(req.params.id);

        res.status(200).json({ message: "Employee Deleted" });
    } catch (error) {
        next(error);
    }
};
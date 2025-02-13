import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeService";

import { successResponse, errorResponse } from "../models/responseModel";
import { Employee } from "../models/employeeModel";


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

        res.status(200).json(successResponse(employees, "Employees Retrieved"));
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
        const employee: Partial<Employee> = {...req.body};

        // call the employeeService by passing the body of the request
        const newEmployee: Employee = await employeeService.createEmployee(employee);

        res.status(201).json(successResponse(newEmployee, "Employee created"));
    } catch (error) {
        next(error);
    }
};

/**
 * @description Fetch an employee by using an ID.
 * @route GET /:id
 * @returns {Promise<void>}
 */
export const getEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // call the employeeService by passing the id from the url path and the body of the request
        const foundEmployee: Employee = await employeeService.getEmployee(
            req.params.id
        );

        res.status(200).json(successResponse(foundEmployee, "Employee Found"));
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
        const dateUpdated: Date = new Date();

        const employee: Partial<Employee> = {...req.body, dateUpdated};
        // call the employeeService by passing the id from the url path and the body of the request
        const updatedEmployee: Employee = await employeeService.updateEmployee(
            req.params.id,
            employee
        );

        res.status(200).json(successResponse(updatedEmployee, "Employee updated"));
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

        res.status(200).json(successResponse({message: "Employee Deleted"}));
    } catch (error) {
        next(error);
    }
};

/**
 * @description Fetch a collection of Employees using a branch ID.
 * @route GET /branch/:id
 * @returns {Promise<void>}
 */
export const getBranchEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // call the employeeService by passing the id from the url path
        const branchEmployees: Employee[] = await employeeService.getBranchEmployees(
            req.params.id
        );

        res.status(200).json(successResponse(branchEmployees, "Branch Staff Found"));
    } catch (error) {
        next(error);
    }
};

/**
 * @description Fetch a collection of Employees a department name.
 * @route GET /department/:department
 * @returns {Promise<void>}
 */
export const getDepartmentEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // call the employeeService by passing the department from the url path
        const departmentEmployees: Employee[] = await employeeService.getDepartmentEmployees(
            req.params.department
        );

        res.status(200).json(successResponse(departmentEmployees, "Department Staff Found"));
    } catch (error) {
        next(error);
    }
};
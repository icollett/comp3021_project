import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/itemService";
import type { Employee } from "../services/itemService";

/**
 * @description Get all items.
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
import { Request, Response, NextFunction } from "express";
import * as branchService from "../services/branchService";
import type { Branch } from "../services/branchService";

/**
 * @description Get all Branches.
 * @route GET /
 * @returns {Promise<void>}
 */
export const getAllBranches = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branches: Branch[] = await branchService.getAllBranches();

        res.status(200).json({ message: "Branches Retrieved", data: branches });
    } catch (error) {
        next(error);
    }
};

/**
 * @description Create a new branch.
 * @route POST /
 * @returns {Promise<void>}
 */
export const createBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // call the branchService by passing the body of the request
        const newBranch: Branch = await branchService.createBranch(req.body);

        res.status(201).json({ message: "Branch Created", data: newBranch });
    } catch (error) {
        next(error);
    }
};

/**
 * @description Update an existing branch.
 * @route PUT /:id
 * @returns {Promise<void>}
 */
export const updateBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // call the branchService by passing the id from the url path and the body of the request
        const updatedBranch: Branch = await branchService.updateBranch(
            req.params.id,
            req.body
        );

        res.status(200).json({ message: "Branch Updated", data: updatedBranch });
    } catch (error) {
        next(error);
    }
};

/**
 * @description Delete an branch.
 * @route DELETE /:id
 * @returns {Promise<void>}
 */
export const deleteBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await branchService.deleteBranch(req.params.id);

        res.status(200).json({ message: "Branch Deleted" });
    } catch (error) {
        next(error);
    }
};
import { Request, Response, NextFunction } from "express";
import * as branchService from "../services/branchService";
import { successResponse } from "../models/responseModel";
import { Branch } from "../models/branchModel";

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

        res.status(200).json(successResponse(branches, "Branches Retrieved"));
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

        res.status(201).json(successResponse(newBranch, "Branch Created"));
    } catch (error) {
        next(error);
    }
};

/**
 * @description Find an existing branch by ID.
 * @route GET /:id
 * @returns {Promise<void>}
 */
export const getBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // call the branchService by passing the id from the url path and the body of the request
        const foundBranch: Branch = await branchService.getBranch(
            req.params.id
        );

        res.status(200).json(successResponse(foundBranch, "Branch Found"));
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

        res.status(200).json(successResponse(updatedBranch, "Branch Updated"));
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

        res.status(200).json(successResponse({message: "Branch Deleted"}));
    } catch (error) {
        next(error);
    }
};
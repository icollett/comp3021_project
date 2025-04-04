import express, { Router } from "express";
import * as branchController from "../controllers/branchController";

import { validateRequest } from "../middleware/validate";
import { branchSchema, branchUpdateSchema } from "../schemas/branchValidation";

// express Router instance created. This instance will group all the branch-related routes.
const router: Router = express.Router();

/**
 * @route GET /
 * @description Get all current branches.
 * @note This could be a bit of information I want to find.
 *
 * @openapi
 * /api/v1/branches/:
 *   get:
 *     summary: Get a list of all current branches.
 *     tags: [Branch]
 *     responses:
 *       200:
 *         description: List of current branches.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 *       442:
 *         description: Fetch failed.
 *       500:
 *         description: Internal server error.
 */
router.get("/", branchController.getAllBranches);

/**
 * @route POST /
 * @description Create a new branch.
 * @openapi
 * /api/v1/branches/:
 *   post:
 *     summary: Create a new branch.
 *     tags: [Branch]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created branch.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       422:
 *         description: Invalid request fields.
 *       500:
 *         description: Internal server error.
 */
router.post("/", validateRequest(branchSchema), branchController.createBranch);

/**
 * @route GET /:id
 * @description Find an existing branch.
 * @note This could be a bit of information I want to find.
 *
 * @openapi
 * /api/v1/branches/{id}:
 *   get:
 *     summary: Find an existing branch using a branchID.
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the branch to find.
 *     responses:
 *       200:
 *         description: The branch with the requested ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       420:
 *         description: Branch not found.
 *       442:
 *         description: Fetch failed.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", branchController.getBranch);

/**
 * @route PUT /:id
 * @description Update an existing branch.
 * @note This could be a bit of information I want to add
 *
 * @openapi
 * /api/v1/branches/{id}:
 *   put:
 *     summary: Update an existing branch
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the branch to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: The updated branch
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       422:
 *         description: Invalid request fields.
 *       442:
 *         description: Branch not found.
 *       500:
 *         description: Internal server error.
 */
router.put("/:id", validateRequest(branchUpdateSchema), branchController.updateBranch);

/**
 * @route DELETE /:id
 * @description Delete an branch.
 * 
 * @openapi
 * /api/v1/branches/{id}:
 *   delete:
 *     summary: Delete an existing branch
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the branch to delete
 *     responses:
 *       200:
 *         description: Branch deleted.
 *       442:
 *         description: Branch not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", branchController.deleteBranch);

export default router;
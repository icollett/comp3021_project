import express, { Router } from "express";
import * as branchController from "../controllers/branchController";

// express Router instance created. This instance will group all the branch-related routes.
const router: Router = express.Router();

/**
 * @route GET /
 * @description Get all branches.
 */
router.get("/", branchController.getAllBranches);

/**
 * @route POST /
 * @description Create a new branch.
 */
router.post("/", branchController.createBranch);

/**
 * @route PUT /:id
 * @description Update an existing branch.
 * @note This could be a bit of information I want to add
 *
 * @openapi
 * /api/v1/branches/{id}:
 *   put:
 *     summary: Update an existing branch
 *     tags: [Employee]
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
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated branch
 */
router.put("/:id", branchController.updateBranch);

/**
 * @route DELETE /:id
 * @description Delete an branch.
 */
router.delete("/:id", branchController.deleteBranch);

export default router;
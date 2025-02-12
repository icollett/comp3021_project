const Joi = require('joi');

import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../models/responseModel";

/**
 * Extended Error interface that includes additional properties for HTTP status codes
 * and custom error codes. This allows for more detailed error handling and client responses.
 *
 * @property code - Custom error code for client-side error handling
 * @property statusCode - HTTP status code to be sent in the response
 *
 * @example
 * const error = new Error("User not found") as ExtendedError;
 * error.code = "USER_NOT_FOUND";
 * error.statusCode = 404;
 */
interface ExtendedError extends Error {
    code?: string;
    statusCode?: number;
}

/**
 * Global error handling middleware for an Express application.
 * Catches all errors passed to next() and formats them into a consistent response format.
 *
 * @param err - The error object passed from previous middleware or route handlers
 * @param req - Express request object
 * @param res - Express response object
 * @param _next - Express next function (unused but required for Express error middleware signature)
 *
 * Features:
 * - Handles both standard and custom errors
 * - Provides consistent error response format
 * - Logs errors for debugging
 *
 * @example
 * // In your Express app setup after all other middleware and controllers, it needs to be last:
 * app.use(errorHandler);
 *
 * // In your route handlers:
 * router.get('/users/:id', async (req, res, next) => {
 *   try {
 *     // ... your logic
 *   } catch (error) {
 *     // Add custom properties if needed
 *     error.statusCode = 404;
 *     error.code = "USER_NOT_FOUND";
 *     next(error);
 *   }
 * });
 */
const errorHandler = (
    err: ExtendedError,
    req: Request,
    res: Response,
    _next: NextFunction // Underscore prefix indicates this parameter is required but unused
): void => {

    // Use a default error code if none provided
    // This helps with client-side error handling consistency
    const code: string = err.code || "UNKNOWN_ERROR";

    // Log the full error details for debugging
    console.error(`Error: ${err.message} (Code: ${code})`);

    // Send a sanitized error response to the client
    // We don't send the actual error message to avoid exposing sensitive details
    // Handle specific types of errors
	if (err instanceof Joi.ValidationError) {
		res.status(400).json(errorResponse(err.message, err.code));
	} else {
		// Generic error response for unhandled errors
		res.status(500).json(errorResponse("An unexpected error occurred"));
	}
};

export default errorHandler;
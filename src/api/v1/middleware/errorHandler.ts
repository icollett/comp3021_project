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

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types
export class ValidationError extends Error {
    public type: string;
    public code: string;
    public statusCode: number;

    constructor(message: string, code?: string, statuscode?: number){
        super(message);
        this.type = "Validation Error"
        this.code = code ?? "422";
        this.statusCode = statuscode ?? 422;
    }
}

export class ServiceError extends Error {
    public type: string;
    public code: string;
    public statusCode: number;

    constructor(message: string, code?: string, statuscode?: number){
        super(message);
        this.type = "Service Error"
        this.code = code ?? "420";
        this.statusCode = statuscode ?? 420;
    }
}

export class RepositoryError extends Error {
    public type: string;
    public code: string;
    public statusCode: number;

    constructor(message: string, code?: string, statuscode?: number){
        super(message);
        this.type = "Repository Error"
        this.code = code ?? "442";
        this.statusCode = statuscode ?? 442;
    }
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
    err: ExtendedError | ValidationError | ServiceError | RepositoryError | null,
    req: Request,
    res: Response,
    _next: NextFunction // Underscore prefix indicates this parameter is required but unused
): void => {
    if (!err) {
        console.error("Error: null or undefined error received");
        res.status(500).json(
            errorResponse("An unexpected error occurred", "UNKNOWN_ERROR")
        );
        return;
    }

    // Log the full error details for debugging
    console.error(`Error: ${err.message}`);

    // Handle specific types of errors
	if (err instanceof ValidationError || 
        err instanceof ServiceError || 
        err instanceof RepositoryError) {
		res.status(err.statusCode).json(errorResponse(err.message, err.code));
	} else {
		// Generic error response for unhandled errors
		res.status(500).json(errorResponse("An unexpected error occurred", "UNKNOWN_ERROR"));
	}
};

export default errorHandler;
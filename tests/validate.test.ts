import { Request, Response, NextFunction } from 'express';
import { validateRequest } from "../src/api/v1/middleware/validate";

import { employeeSchema, employeeUpdateSchema } from "../src/api/v1/schemas/employeeValidation";

describe('validateRequest', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      headers: {},
      params: {},
      body: {}
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: {}
    };
    mockNext = jest.fn();
  });

  it('createEmployee should pass for valid input', () => {
    // Arrange
    mockReq.body = {
      name: "Alice Johnson",
      position: "Branch Manager",
      department: "Management",
      email: "alice.johnson@pixell-river.com",
      phone: "604-555-0148",
      branchID: "1"
    };
    const middleware = validateRequest(employeeSchema);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  it('createEmployee should fail for invalid input', () => {
    // Arrange
    mockReq.body = {
      position: "Branch Manager",
      email: "alice.johnson@pixell-river.com",
      branchID: "1"
    };
    const middleware = validateRequest(employeeSchema);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });
});
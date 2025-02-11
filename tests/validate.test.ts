import { Request, Response, NextFunction } from 'express';
import { validateRequest } from "../src/api/v1/middleware/validate";

import { employeeSchema, employeeUpdateSchema } from "../src/api/v1/schemas/employeeValidation";
import { branchSchema, branchUpdateSchema } from "../src/api/v1/schemas/branchValidation";

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

  it('employeeSchema should pass for valid input', () => {
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

  it('employeeSchema should fail for invalid input', () => {
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

  it('employeeUpdateSchema should pass for valid input', () => {
    // Arrange
    mockReq.body = {
      id: "1",
      department: "Management",
      email: "alice.james@pixell-river.com",
    };
    const middleware = validateRequest(employeeUpdateSchema);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  it('employeeUpdateSchema should fail for invalid input', () => {
    // Arrange
    mockReq.body = {
      id: "1",
      email: "alice.james.pixell-river.com",
    };
    const middleware = validateRequest(employeeUpdateSchema);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('branchSchema should pass for valid input', () => {
    // Arrange
    mockReq.body = {
      name: "Vancouver Branch",
      address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
      phone: "604-456-0022",
    };
    const middleware = validateRequest(branchSchema);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  it('branchSchema should fail for invalid input', () => {
    // Arrange
    mockReq.body = {
      name: "",
      address: "",
      phone: "604-456-0022",
    };
    const middleware = validateRequest(employeeUpdateSchema);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('branchUpdateSchema should pass for valid input', () => {
    // Arrange
    mockReq.body = {
      id: "1",
      address: "123 Main St.",
    };
    const middleware = validateRequest(branchUpdateSchema);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  it('branchUpdateSchema should fail for invalid input', () => {
    // Arrange
    mockReq.body = {
      id: "1",
      name: "",
      address: "",
    };
    const middleware = validateRequest(employeeUpdateSchema);

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
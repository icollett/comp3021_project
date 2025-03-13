import { Request, Response, NextFunction } from 'express';
import { validateRequest, validate } from "../src/api/v1/middleware/validate";

import {Employee} from "../src/api/v1/models/employeeModel";
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
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
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
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
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
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
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
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });
});

describe("validate function for employeeSchema", () => {
  it("should not throw an error for valid Employee data", () => {
    const data: Partial<Employee> = {
      name: "Alice Johnson",
      position: "Branch Manager",
      department: "Management",
      email: "alice.johnson@pixell-river.com",
      phone: "604-555-0148",
      branchID: "1"
    };

    expect(() => validate(employeeSchema, data)).not.toThrow();
  });

  it("should not throw an error for valid Employee data with without optional fields", () => {
    const data: Partial<Employee> = {
      name: "Alice Johnson",
      position: "Branch Manager",
      email: "alice.johnson@pixell-river.com",
      branchID: "1"
    };

    expect(() => validate(employeeSchema, data)).not.toThrow();
  });

  it("should throw an error for missing name", () => {
    const data: Partial<Employee> = {
      position: "Branch Manager",
      department: "Management",
      email: "alice.johnson@pixell-river.com",
      phone: "604-555-0148",
      branchID: "1"
    };

    expect(() => validate(employeeSchema, data)).toThrow(
        "Validation error: Name is required"
    );
  });

  it("should throw an error for empty name", () => {
    const data: Partial<Employee> = {
      name: "",
      position: "Branch Manager",
      department: "Management",
      email: "alice.johnson@pixell-river.com",
      phone: "604-555-0148",
      branchID: "1"
    };

    expect(() => validate(employeeSchema, data)).toThrow(
        "Validation error: Name cannot be empty"
    );
  });

  it("should throw an error for missing position", () => {
    const data: Partial<Employee> = {
      name: "Alice Johnson",
      department: "Management",
      email: "alice.johnson@pixell-river.com",
      phone: "604-555-0148",
      branchID: "1"
    };

    expect(() => validate(employeeSchema, data)).toThrow(
        "Validation error: Position is required"
    );
  });

  it("should throw an error for empty position", () => {
    const data: Partial<Employee> = {
      name: "Alice Johnson",
      position: "",
      department: "Management",
      email: "alice.johnson@pixell-river.com",
      phone: "604-555-0148",
      branchID: "1"
    };

    expect(() => validate(employeeSchema, data)).toThrow(
        "Validation error: Position cannot be empty"
    );
  });

  it("should throw an error for missing email", () => {
    const data: Partial<Employee> = {
      name: "Alice Johnson",
      position: "Branch Manager",
      department: "Management",
      phone: "604-555-0148",
      branchID: "1"
    };

    expect(() => validate(employeeSchema, data)).toThrow(
        "Validation error: Email is required"
    );
  });

  it("should throw an error for empty email", () => {
    const data: Partial<Employee> = {
      name: "Alice Johnson",
      position: "Branch Manager",
      department: "Management",
      email: "",
      phone: "604-555-0148",
      branchID: "1"
    };

    expect(() => validate(employeeSchema, data)).toThrow(
        "Validation error: Email cannot be empty"
    );
  });

  it("should throw an error for invalid email format", () => {
    const data: Partial<Employee> = {
      name: "Alice Johnson",
      position: "Branch Manager",
      department: "Management",
      email: "alice.johnson.pixell-river.com",
      phone: "604-555-0148",
      branchID: "1"
    };

    expect(() => validate(employeeSchema, data)).toThrow(
        "Validation error: Invalid email format"
    );
  });

  it("should throw an error for missing branch ID", () => {
    const data: Partial<Employee> = {
      name: "Alice Johnson",
      position: "Branch Manager",
      department: "Management",
      email: "alice.johnson@pixell-river.com",
      phone: "604-555-0148",
    };

    expect(() => validate(employeeSchema, data)).toThrow(
        "Validation error: BranchID is required"
    );
  });

  it("should throw an error for an empty branch ID", () => {
    const data: Partial<Employee> = {
      name: "Alice Johnson",
      position: "Branch Manager",
      department: "Management",
      email: "alice.johnson@pixell-river.com",
      phone: "604-555-0148",
      branchID: ""
    };

    expect(() => validate(employeeSchema, data)).toThrow(
        "Validation error: BranchID cannot be empty"
    );
  });
});

describe("validate function for employeeUpdateSchema", () => {
  it("should not throw an error for valid Employee data", () => {
    const data: Partial<Employee> = {
      id: "1",
      name: "Alice Johnson",
      position: "Branch Manager",
      department: "Management",
      email: "alice.johnson@pixell-river.com",
      phone: "604-555-0148",
      branchID: "1"
    };

    expect(() => validate(employeeUpdateSchema, data)).not.toThrow();
  });

  it("should not throw an error for valid Employee data with without optional fields", () => {
    const data: Partial<Employee> = {
      id: "1",
      name: "Alice Johnson",
      position: "Branch Manager",
      email: "alice.johnson@pixell-river.com",
      branchID: "1"
    };

    expect(() => validate(employeeUpdateSchema, data)).not.toThrow();
  });

  it("should throw an error for missing ID", () => {
    const data: Partial<Employee> = {
      name: "Alice Johnson",
      position: "Branch Manager",
      department: "Management",
      email: "alice.johnson@pixell-river.com",
      phone: "604-555-0148",
      branchID: "1"
    };

    expect(() => validate(employeeUpdateSchema, data)).toThrow(
      "Validation error: ID is required"
    );
  });

  it("should throw an error for empty ID", () => {
    const data: Partial<Employee> = {
      id: "",
      name: "Alice Johnson",
      position: "Branch Manager",
      department: "Management",
      email: "alice.johnson@pixell-river.com",
      phone: "604-555-0148",
      branchID: "1"
    };

    expect(() => validate(employeeUpdateSchema, data)).toThrow(
      "Validation error: ID cannot be empty"
    );
  });

  it("should throw an error for empty name", () => {
    const data: Partial<Employee> = {
      id: "1",
      name: "",
      position: "Branch Manager",
      department: "Management",
      email: "alice.johnson@pixell-river.com",
      phone: "604-555-0148",
      branchID: "1"
    };

    expect(() => validate(employeeUpdateSchema, data)).toThrow(
        "Validation error: Name cannot be empty"
    );
  });

  it("should throw an error for empty position", () => {
    const data: Partial<Employee> = {
      id: "1",
      name: "Alice Johnson",
      position: "",
      department: "Management",
      email: "alice.johnson@pixell-river.com",
      phone: "604-555-0148",
      branchID: "1"
    };

    expect(() => validate(employeeUpdateSchema, data)).toThrow(
        "Validation error: Position cannot be empty"
    );
  });

  it("should throw an error for empty email", () => {
    const data: Partial<Employee> = {
      id: "1",
      name: "Alice Johnson",
      position: "Branch Manager",
      department: "Management",
      email: "",
      phone: "604-555-0148",
      branchID: "1"
    };

    expect(() => validate(employeeUpdateSchema, data)).toThrow(
        "Validation error: Email cannot be empty"
    );
  });

  it("should throw an error for invalid email format", () => {
    const data: Partial<Employee> = {
      id: "1",
      name: "Alice Johnson",
      position: "Branch Manager",
      department: "Management",
      email: "alice.johnson.pixell-river.com",
      phone: "604-555-0148",
      branchID: "1"
    };

    expect(() => validate(employeeUpdateSchema, data)).toThrow(
        "Validation error: Invalid email format"
    );
  });

  it("should throw an error for an empty branch ID", () => {
    const data: Partial<Employee> = {
      id: "1",
      name: "Alice Johnson",
      position: "Branch Manager",
      department: "Management",
      email: "alice.johnson@pixell-river.com",
      phone: "604-555-0148",
      branchID: ""
    };

    expect(() => validate(employeeUpdateSchema, data)).toThrow(
        "Validation error: BranchID cannot be empty"
    );
  });

  it("should throw an error for insufficient request attributes", () => {
    const data: Partial<Employee> = {
      id: "1",
    };

    expect(() => validate(employeeUpdateSchema, data)).toThrow(
        "Validation error: Body attributes are required"
    );
  });
});
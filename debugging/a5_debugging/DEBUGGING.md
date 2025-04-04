# Debugging Analysis A5

## Scenario 1: Accessing environment variables

-   **Breakpoint Location:** server.ts line 10
-   **Objective:** Check to verify environment variables are properly loaded and accessed.

### Debugger Observations

-   **Variable States:**
<pre>
> process.env.PORT = "3000"
> process.env.NODE_ENV = "development"
> process.env.FIREBASE_PROJECT_ID = "comp-3018-a3"
> process.env.SWAGGER_SERVER_URL = "http://localhost:3000/api/v1"
> PORT = "3000"
</pre>
-   **Call Stack:** Right after ts-node compliation.
-   **Behavior:** Env variables have been properly loaded, and were able to be accessed by the program.

### Analysis

-   What did you learn from this scenario?
> That the environmant variables are being loaded when the import for app is called. Not when app is invoked for the first time.
-   Did you observe any unexpected behavior? If so, what might be the cause?
> No unexpected behaviours.
-   Are there areas for improvement or refactoring in this part of the code?:
> No, its simply accessing a variable.
-   How does this enhance your understanding of the overall project?:
> When something is imported, the file it comes from is processed in its entirety. Not just import related sections.

## Scenario 2: Checking Helmet HHTP response headers

-   **Breakpoint Location:** employeeController.ts line 21
-   **Objective:** Verify that Helmet is setting security headers for the API responses.

### Debugger Observations

-   **Variable States:**
<pre>
> res.getHeaders() ={
  'content-security-policy': "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
  'cross-origin-opener-policy': 'same-origin',
  'cross-origin-resource-policy': 'same-origin',
  'origin-agent-cluster': '?1',
  'referrer-policy': 'no-referrer',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',      
  'strict-transport-security': 'max-age=31536000; includeSubDomains',      
  'x-content-type-options': 'nosniff',
  'x-dns-prefetch-control': 'off',
  'x-download-options': 'noopen',
  'x-frame-options': 'SAMEORIGIN',
  'x-permitted-cross-domain-policies': 'none',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',      
  'x-content-type-options': 'nosniff',
  'x-dns-prefetch-control': 'off',
  'x-download-options': 'noopen',
  'x-frame-options': 'SAMEORIGIN',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',      
  'x-content-type-options': 'nosniff',
  'x-dns-prefetch-control': 'off',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',      
  'x-content-type-options': 'nosniff',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',      
  'x-content-type-options': 'nosniff',
  'x-dns-prefetch-control': 'off',
  'x-download-options': 'noopen',
  'x-frame-options': 'SAMEORIGIN',
  'x-permitted-cross-domain-policies': 'none',
  'x-frame-options': 'SAMEORIGIN',
  'x-permitted-cross-domain-policies': 'none',
  'x-xss-protection': '0',
  'access-control-allow-origin': '*'
  'access-control-allow-origin': '*'
}
</pre>
-   **Call Stack:** router > process_params > dispatch > handle > getAllEmployees
-   **Behavior:** Helmet has set the expected default headers for the outgoing response.

### Analysis

-   What did you learn from this scenario?
> That it is really simple to incorperate helmet into my application. I did not even need to put it along any of the routes like other middleware that was used, or invoke it using next() like with error handling.
-   Did you observe any unexpected behavior? If so, what might be the cause?
> No unexpected behaviour.
-   Are there areas for improvement or refactoring in this part of the code?:
> I dont know enough about Helmet to know if there is a better configuration for thisproject than the default settings.
-   How does this enhance your understanding of the overall project?:
> It is easy to add addition security measures to application to protect things like cross-site-scripting and blocking others from loading my project resources.

## Scenario 3: Verify openapi.json is correctly formed with using swagger.

-   **Breakpoint Location:** generate-openapi.ts line 8
-   **Objective:** Verify the openapi.json file is generated using the swagger documentation setup.

### Debugger Observations

-   **Variable States:**
<pre>
> swaggerOptions = {
  openapi: "3.0.0",
  info: {
    title: "Employee and Branch Management API Documentation",
    version: "1.0.0",
    description: "This is the API documentation for the employee and branch management appliciation.",
  },
  server: [
    {
      url: "http://localhost:3000/api/v1",
      description: "Local Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Branch: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "The unique identifier for an branch.",
          },
          name: {
            type: "string",
            description: "The name of the company branch.",
          },
          phone: {
            type: "string",
            description: "Phone number for the branch location.",
          },
          address: {
            type: "string",
            description: "Branch location street address.",
          },
        },
      },
      Employee: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "The unique identifier for an Employee.",
          },
          name: {
            type: "string",
            description: "The name of an employee.",
          },
          position: {
            type: "string",
            description: "Position title of an employee.",
          },
          department: {
            type: "string",
            description: "Company department the employee works in.",
          },
          email: {
            type: "string",
            description: "Work email of an employee.",
          },
          phone: {
            type: "string",
            description: "Work phone number of an employee.",
          },
          branchID: {
            type: "string",
            description: "Branch ID where the employee works.",
          },
        },
      },
    },
  },
  paths: {
    "/api/v1/branches/": {
      get: {
        summary: "Get a list of all current branches.",
        tags: [
          "Branch",
        ],
        responses: {
          "200": {
            description: "List of current branches.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Branch",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new branch.",
        tags: [
          "Branch",
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  address: {
                    type: "string",
                  },
                  phone: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "The created branch.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Branch",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/branches/{id}": {
      get: {
        summary: "Find an existing branch using a branchID.",
        tags: [
          "Branch",
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "string",
            },
            required: true,
            description: "ID of the branch to find.",
          },
        ],
        responses: {
          "200": {
            description: "The branch with the requested ID.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Branch",
                },
              },
            },
          },
        },
      },
      put: {
        summary: "Update an existing branch",
        tags: [
          "Branch",
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "string",
            },
            required: true,
            description: "ID of the branch to update",
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  address: {
                    type: "string",
                  },
                  phone: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "The updated branch",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Branch",
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete an existing branch",
        tags: [
          "Branch",
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "string",
            },
            required: true,
            description: "ID of the branch to delete",
          },
        ],
        responses: {
          "200": {
            description: "Branch deleted.",
          },
        },
      },
    },
    "/api/v1/employees/": {
      get: {
        summary: "Fetch a list of all current employees.",
        tags: [
          "Employee",
        ],
        responses: {
          "200": {
            description: "A list of employee objects.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Employee",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new employee.",
        tags: [
          "Employee",
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  position: {
                    type: "string",
                  },
                  department: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  phone: {
                    type: "string",
                  },
                  branchID: {
                    type: "string",
                  },
                },
              },
            },
            description: "Information needed to create an Employee.",
          },
        },
        responses: {
          "200": {
            description: "The employee with the specified ID.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Employee",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/employees/{id}": {
      get: {
        summary: "Find an employee by an ID value.",
        tags: [
          "Employee",
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "string",
            },
            required: true,
            description: "ID of the employee to find",
          },
        ],
        responses: {
          "200": {
            description: "The employee with the specified ID.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Employee",
                },
              },
            },
          },
        },
      },
      put: {
        summary: "Update an existing employee",
        tags: [
          "Employee",
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "string",
            },
            required: true,
            description: "ID of the employee to update",
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  position: {
                    type: "string",
                  },
                  department: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  phone: {
                    type: "string",
                  },
                  branchID: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "The updated employee",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Employee",
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete an existing Employee",
        tags: [
          "Employee",
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "string",
            },
            required: true,
            description: "ID of the employee to delete",
          },
        ],
        responses: {
          "200": {
            description: "Employee deleted.",
          },
        },
      },
    },
    "/api/v1/employees/branch/{id}": {
      get: {
        summary: "Find all employees that work at branchID location.",
        tags: [
          "Employee",
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "string",
            },
            required: true,
            description: "Branch ID of the location you want the staff list of.",
          },
        ],
        responses: {
          "200": {
            description: "A collection of Employees that work at branch location ID.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Employee",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/employees/department/{department}": {
      get: {
        summary: "Find all employees that work in a department.",
        tags: [
          "Employee",
        ],
        parameters: [
          {
            in: "path",
            name: "department",
            schema: {
              type: "string",
            },
            required: true,
            description: "Department name you want the staff list of.",
          },
        ],
        responses: {
          "200": {
            description: "A collection of Employees that work in said department.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Employee",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  tags: [
  ],
}
</pre>
-   **Call Stack:** main > require.extensions > compile > anonymous
-   **Behavior:** The output openapi.json file correctly contains all the swaggerOptions contents.

### Analysis

-   What did you learn from this scenario?
> It is easy to generate static documentation using npx to execute the redocly package command line commands.
-   Did you observe any unexpected behavior? If so, what might be the cause?
> No unexpected behaviour.
-   Are there areas for improvement or refactoring in this part of the code?:
> Not that I can think of. What happened was just writing existing documentation to and reading it from a json file.
-   How does this enhance your understanding of the overall project?:
> I can quickly generate api documentation that does not require the server to be running and have access to the /api-docs endpoint. This documentation can be hosted elsewhere for reference when the API is not up.
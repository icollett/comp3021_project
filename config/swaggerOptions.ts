import swaggerJsDoc from "swagger-jsdoc";
// import swagger ui middleware, jsdoc library

const swaggerOptions: swaggerJsDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Management API Documentation",
            version: "1.0.0",
            description: "This is the API documentation for the Task Management applciation.",
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
                }
            }
        }
    },
    // path to annotated files
    apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/models/*.ts"],
};

// Initialize Swagger JSDoc object
export const generateSwaggerDocs = (): object => {
    return swaggerJsDoc(swaggerOptions)
};
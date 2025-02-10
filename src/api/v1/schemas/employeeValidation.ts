import Joi, { ObjectSchema } from "joi";

export const employeeSchema: ObjectSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty",
    }),
    position: Joi.string().required().messages({
        "any.required": "Position is required",
        "string.empty": "Position cannot be empty.",
    }),
    email: Joi.string().required().messages({
        "any.required": "Email is required",
        "sting.empty": "Email cannot be empty.",
    }),
    branchID: Joi.string().required().messages({
        "any.required": "BranchID is required",
        "sting.empty": "BranchhID cannot be empty.",
    }),
    department: Joi.string().optional().messages({
        "sting.empty": "Department cannot be empty.",
    }),
    phone: Joi.string().optional().messages({
        "sting.empty": "Phone number can not be empty.",
    }),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
});

// https://stackoverflow.com/questions/43103400/is-it-possible-to-require-at-least-one-field-from-a-set-of-defined-fields
export const employeeUpdateSchema: ObjectSchema = Joi.object({
    name: Joi.string().messages({
        "string.empty": "Name cannot be empty",
    }),
    position: Joi.string().messages({
        "string.empty": "Position cannot be empty.",
    }),
    email: Joi.string().messages({
        "sting.empty": "Email cannot be empty.",
    }),
    branchID: Joi.string().messages({
        "sting.empty": "BranchhID cannot be empty.",
    }),
    department: Joi.string().messages({
        "sting.empty": "Department cannot be empty.",
    }),
    phone: Joi.string().messages({
        "sting.empty": "Phone number can not be empty.",
    }),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
}).min(1);
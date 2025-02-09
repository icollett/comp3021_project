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
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
});
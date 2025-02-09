import Joi, { ObjectSchema } from "joi";

export const branchSchema: ObjectSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty",
    }),
    address: Joi.string().required().messages({
        "any.required": "Address is required",
        "string.empty": "Address cannot be empty.",
    }),
    phone: Joi.string().required().messages({
        "any.required": "Phone number is required",
        "sting.empty": "Phone number cannot be empty.",
    }),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
});
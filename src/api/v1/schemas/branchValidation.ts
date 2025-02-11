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
});

export const branchUpdateSchema: ObjectSchema = Joi.object({
    id: Joi.string().required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty",
    }),
    name: Joi.string().messages({
        "string.empty": "Name cannot be empty",
    }),
    address: Joi.string().messages({
        "string.empty": "Address cannot be empty.",
    }),
    phone: Joi.string().messages({
        "sting.empty": "Phone number cannot be empty.",
    }),
}).min(2).messages({
    "object.min": "Body attributes are required.",
});;
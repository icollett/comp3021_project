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
    phone: Joi.string().required().regex(/(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/i).messages({
        "string.empty": "Phone number can not be empty.",
        "string.pattern.base": "Invalid phone number format.",
        "any.required": "Phone number is required."
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
    phone: Joi.string().regex(/(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/i).messages({
        "string.empty": "Phone number can not be empty.",
        "string.pattern.base": "Invalid phone number format.",
    }),
}).min(2).messages({
    "object.min": "Body attributes are required.",
});;
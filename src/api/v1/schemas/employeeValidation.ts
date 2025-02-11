import Joi, { ObjectSchema } from "joi";

export const employeeSchema: ObjectSchema = Joi.object({
    //https://stackoverflow.com/questions/55222425/joi-how-to-allow-empty-spaces-and-punctuation
    name: Joi.string().required().regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/).messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty",
        "object.regex": "Invalid name characters."
    }),
    position: Joi.string().regex(/^\w+(?:\s+\w+)*$/).messages({
        "any.required": "Position is required",
        "string.empty": "Position cannot be empty.",
        "object.regex": "Invalid position title format.",
    }),
    email: Joi.string().required().regex(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i).messages({
        "any.required": "Email is required",
        "sting.empty": "Email cannot be empty.",
        "object.regex": "Invalid email format."
    }),
    branchID: Joi.string().required().alphanum().messages({
        "any.required": "BranchID is required",
        "sting.empty": "BranchhID cannot be empty.",
    }),
    department: Joi.string().optional().messages({
        "sting.empty": "Department cannot be empty.",
    }),
    //https://regex101.com/r/wZ4uU6/2
    phone: Joi.string().optional().regex(/(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/i).messages({
        "sting.empty": "Phone number can not be empty.",
        "object.regex": "Invalid phone number format."
    }),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
});

// https://stackoverflow.com/questions/43103400/is-it-possible-to-require-at-least-one-field-from-a-set-of-defined-fields
export const employeeUpdateSchema: ObjectSchema = Joi.object({
    id: Joi.string().required().alphanum().messages({
        "string.empty": "ID cannot be empty",
    }),
    name: Joi.string().regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/).messages({
        "string.empty": "Name cannot be empty",
        "object.regex": "Invalid email format."
    }),
    position: Joi.string().regex(/^\w+(?:\s+\w+)*$/).messages({
        "string.empty": "Position cannot be empty.",
        "object.regex": "Invalid position title format."
    }),
    email: Joi.string().regex(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i).messages({
        "sting.empty": "Email cannot be empty.",
        "object.regex": "Invalid email format."
    }),
    branchID: Joi.string().alphanum().messages({
        "sting.empty": "BranchhID cannot be empty.",
    }),
    department: Joi.string().messages({
        "sting.empty": "Department cannot be empty.",
    }),
    phone: Joi.string().regex(/(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/i).messages({
        "sting.empty": "Phone number can not be empty.",
        "object.regex": "Invalid phone number format."
    }),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
}).min(2).messages({
    "object.min": "Body attributes are required.",
});
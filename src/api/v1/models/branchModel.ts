/**
 * @interface Branch
 * @description Represents an Branch object.
 */
export type Branch = {
    id: string,
    name: string,
    address: string,
    phone: string,
    createdAt?: Date,
    updatedAt?: Date,
};
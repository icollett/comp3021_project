/**
 * @interface Branch
 * @description Represents an Branch object.
 * 
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for an branch.
 *         name:
 *           type: string
 *           description: The name of the company branch.
 *         phone:
 *           type: string
 *           description: Phone number for the branch location.
 *         address:
 *           type: string
 *           description: Branch location street address.
 *
 */
export type Branch = {
    id: string,
    name: string,
    address: string,
    phone: string,
};
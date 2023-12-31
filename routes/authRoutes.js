const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/auth");
const { userValidator } = require("../middlewares/inputValidator");
const authController = require("../controllers/Auth/authController");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API endpoints for auth operations
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password
 *       additionalProperties: false
 *     UserWithRole:
 *          allOf:
 *          - $ref: '#/components/schemas/Auth'
 *          - type: object
 *            properties:
 *              role:
 *                type: string
 *                enum:
 *                  - admin
 *                  - user
 *            required:
 *              - role
 */
/**
 * @swagger
 * /register:
 *  post:
 *    tags: [Auth]
 *    summary: Register admin
 *    description: This api is used to admin register
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Auth'
 *    responses:
 *      200:
 *        description: Register successfully
 */
router.post("/register", userValidator, authController.registerAdmin);
/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     description: This API is used for user login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: login successfully
 */
router.post("/login", authController.login);
/**
 * @swagger
 * /logout:
 *  post:
 *    tags: [Auth]
 *    summary: Logout user
 *    description: This api is used to clear cookie
 *    responses:
 *      200:
 *        description: Logout Succesfully!
 */
router.post("/logout", validateToken(), authController.logout);

module.exports = router;

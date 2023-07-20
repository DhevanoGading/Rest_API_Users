const express = require("express");
const router = express.Router();
const authController = require("../controllers/authentication");
const { validateToken } = require("../utils/auth");
const { userValidator } = require("../utils/inputValidator");

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
 */
/**
 * @swagger
 * /register/admin:
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
router.post("/register/admin", [userValidator], authController.registerAdmin);
/**
 * @swagger
 * /register:
 *  post:
 *    tags: [Auth]
 *    summary: Register user
 *    description: This api is used to user register
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
router.post("/register", [userValidator], authController.registerUser);
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

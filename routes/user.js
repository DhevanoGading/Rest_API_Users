const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { validateToken } = require("../auth");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoints for user operations
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
 *    tags: [User]
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
router.post("/register/admin", userController.registerAdmin);
/**
 * @swagger
 * /register:
 *  post:
 *    tags: [User]
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
router.post("/register", userController.registerUser);
/**
 * @swagger
 * /login:
 *   post:
 *    tags: [User]
 *     summary: login user
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
router.post("/login", userController.login);
/**
 * @swagger
 * /logout:
 *  post:
 *    tags: [User]
 *    summary: Logout user
 *    description: This api is used to clear cookie
 *    responses:
 *      200:
 *        description: Logout Succesfully!
 */
router.post("/logout", validateToken(), userController.logout);
/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          email:
 *            type: string
 *          password:
 *            type: string
 *          role:
 *            type: string
 *            enum:
 *              - admin
 *              - user
 */
/**
 * @swagger
 * /user:
 *  get:
 *    tags: [User]
 *    summary: Get all data users
 *    description: This api is used to get all data users
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/User'
 */
router.get("/user", validateToken("admin"), userController.getAll);
/**
 * @swagger
 * /profile/{id}:
 *  get:
 *    tags: [User]
 *    summary: Get data users
 *    description: This api is used to get data user
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID required
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/User'
 */
router.get("/profile/:id", validateToken(), userController.getUser);
/**
 * @swagger
 * /user/{id}:
 *  put:
 *    tags: [User]
 *    summary: Update data user
 *    description: This api is used to update update
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID required
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Auth'
 *    responses:
 *      200:
 *        description: update successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/User'
 */
router.put("/user/:id", validateToken(), userController.updateUser);
/**
 * @swagger
 * /user/{id}:
 *  delete:
 *    tags: [User]
 *    summary: Delete data users
 *    description: This api is used to delete data user
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID required
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Delete user successfully
 */
router.delete("/user/:id", validateToken("admin"), userController.deleteUser);

module.exports = router;

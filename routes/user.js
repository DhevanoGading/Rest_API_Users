const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { validateToken } = require("../utils/auth");
const { body } = require("express-validator");
const { userValidator } = require("../utils/inputValidator");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoints for user operations
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
 * /user?page=1&limit=5:
 *  get:
 *    tags: [User]
 *    summary: Get all data users
 *    description: This api is used to get all data users
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        description: The number of page
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        description: The limit of data
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
router.get("/", validateToken("admin"), userController.getAll);
/**
 * @swagger
 * /user/{id}:
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
router.get("/:id", validateToken(), userController.getUser);
/**
 * @swagger
 * /user/{id}:
 *  put:
 *    tags: [User]
 *    summary: Update data user
 *    description: This api is used to update user
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
router.put("/:id", validateToken(), userValidator, userController.updateUser);
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
router.delete("/:id", validateToken("admin"), userController.deleteUser);
/**
 * @swagger
 * /user/find:
 *  post:
 *    tags: [User]
 *    summary: Search user
 *    description: This api is used to search user
 *    parameters:
 *      - in: body
 *        name: requestBody
 *        description: Keyword for searching
 *        required: false
 *        schema:
 *          type: object
 *          properties:
 *           keyword:
 *             type: string
 *    responses:
 *      200:
 *        description: user founded!
 */
router.post("/find", validateToken("admin"), userController.findUser);

module.exports = router;

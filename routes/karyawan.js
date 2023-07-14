const express = require("express");
const router = express.Router();
const { validateToken } = require("../auth");
const karyawanController = require("../controllers/karyawan");

/**
 * @swagger
 * /:
 *  post:
 *    summary: Add karywan
 *    description: This api is used to add karyawan
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Karyawan'
 *    responses:
 *      200:
 *        description: Register successfully
 */
router.post("/", validateToken("admin"), karyawanController.addKaryawan);
router.post("/login", karyawanController.login);
router.post("/logout", karyawanController.logout);

module.exports = router;

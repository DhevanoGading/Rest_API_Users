const express = require("express");
const router = express.Router();
const { validateToken } = require("../utils/auth");
const { karyawanValidator } = require("../utils/inputValidator");
const karyawanController = require("../controllers/karyawan");

/**
 * @swagger
 * tags:
 *   name: Karyawan
 *   description: API endpoints for Karyawan operations
 * components:
 *   schemas:
 *     Karyawan:
 *       type: object
 *       properties:
 *         karyawanId:
 *           type: string
 *         namaLengkap:
 *           type: string
 *         tempatLahir:
 *           type: string
 *         tglLahir:
 *           type : string
 *           format: date
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         telegramId:
 *           type: string
 *         nomorTelepon:
 *           type: string
 *         jenisIdentitas:
 *           type: string
 *           enum:
 *              - KTP
 *              - SIM
 *         nomorIdentitas:
 *           type: string
 *         statusPernikahan:
 *           type: string
 *           enum:
 *              - Lajang
 *              - Menikah
 *              - Janda
 *              - Duda
 *         alamatKtp:
 *           type: string
 *         pendidikanAkhir:
 *           type: string
 *           enum:
 *              - SMK/SMU/Sederajat
 *              - D1
 *              - D2
 *              - D3
 *              - S1
 *              - S2
 *              - S3
 *         namaInstitusi:
 *           type: string
 *         jurusan:
 *           type: string
 *         nikKaryawan:
 *           type: string
 *         divisi:
 *           type: string
 *           enum:
 *              - RMO
 *              - PMO
 *              - BSO
 *              - SDO
 *              - DSO
 *              - KMO
 *              - BO
 *         resource:
 *           type: string
 *           enum:
 *              - RMO
 *              - PMO
 *              - BSO
 *              - SDO
 *              - DSO
 *              - KMO
 *              - BO
 *         posisi:
 *           type: string
 *           enum:
 *              - Developer
 *              - Developer Analyst
 *              - System Analyst
 *              - Project Manager
 *              - Project Admin
 *              - Quality Control
 *              - Technical Writer
 *              - Data Scientist
 *              - Support Surveillance
 *              - Support Leader
 *              - Support Specialist
 *              - Subject Matter Expert
 *              - UI/UX
 *              - System Architect
 *              - Digital Solutions Senior Officer
 *              - RF Engineer
 *              - System Administrator
 *              - Senior Training Officer
 *              - Field Engineer Radar
 *              - Data Analyst
 *              - Consultant
 *              - Linguistict
 *              - Radar Engineer
 *              - Inventory Admin
 *              - Machine Learning Engineer
 *         statusKaryawan:
 *           type: string
 *           enum:
 *              - Permanent
 *              - Fixed-term contracts
 *              - Freelance
 *         penempatan:
 *           type: string
 *           enum:
 *              - Jakarta
 *              - Yogyakarta
 *         tglBergabung:
 *           type: string
 *           format: date
 *         userRole:
 *           type: string
 *           enum:
 *              - HRD
 *              - PMO Admin
 *              - PMO Employee
 *              - BSO Admin
 *              - BSO Employee
 *              - SDO Admin
 *              - SDO Employee
 *              - RMO Admin
 *              - RMO Employee
 *              - Trello Admin
 *              - Project Manager
 *              - System Analyst
 *              - Finance
 *       required:
 *         - karyawanId
 *         - namaLengkap
 *         - tempatLahir
 *         - tglLahir
 *         - email
 *         - telegramId
 *         - nomorTelepon
 *         - jenisIdentitas
 *         - nomorIdentitas
 *         - statusPernikahan
 *         - alamatKtp
 *         - pendidikanAkhir
 *         - namaInstitusi
 *         - jurusan
 *         - nikKaryawan
 *         - divisi
 *         - resource
 *         - posisi
 *         - statusKaryawan
 *         - penempatan
 *         - tglBergabung
 *         - userRole
 *       additionalProperties: false
 */
/**
 * @swagger
 * /karyawan:
 *  post:
 *    tags: [Karyawan]
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
router.post(
  "/",
  validateToken("admin"),
  karyawanValidator,
  karyawanController.addKaryawan
);
/**
 * @swagger
 * /karyawan:
 *  get:
 *    tags: [Karyawan]
 *    summary: Get all data karyawan
 *    description: This api is used to get all data karyawan
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
 *                $ref: '#components/schemas/Karyawan'
 */
router.get("/", validateToken("admin"), karyawanController.getAll);
/**
 * @swagger
 * /karyawan/{id}:
 *  get:
 *    tags: [Karyawan]
 *    summary: Get data karyawan
 *    description: This api is used to get data karyawan
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID required
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Karyawan'
 */
router.get("/:id", validateToken("admin"), karyawanController.getKaryawan);
/**
 * @swagger
 * /karyawan/find:
 *  post:
 *    tags: [Karyawan]
 *    summary: Search karywan
 *    description: This api is used to search karyawan
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
 *        description: karyawan founded!
 */
router.post("/find", validateToken("admin"), karyawanController.findKaryawan);
/**
 * @swagger
 * /karyawan/{karyawanId}:
 *  put:
 *    tags: [Karyawan]
 *    summary: Update data karyawan
 *    description: This api is used to update karyawan
 *    parameters:
 *      - in: path
 *        name: karyawanId
 *        required: true
 *        description: ID required
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Karyawan'
 *    responses:
 *      200:
 *        description: update successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/Karyawan'
 */
router.put(
  "/:karyawanId",
  validateToken("admin"),
  karyawanValidator,
  karyawanController.updateKaryawan
);
/**
 * @swagger
 * /karyawan/{id}:
 *  delete:
 *    tags: [Karyawan]
 *    summary: Delete data karyawan
 *    description: This api is used to delete data karyawan
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID required
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Delete karyawan successfully
 */
router.delete(
  "/:id",
  validateToken("admin"),
  karyawanController.deleteKaryawaan
);

module.exports = router;

const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/auth");
const { karyawanValidator, cutiValidator, mutasiValidator, resignValidator, challengeValidator } = require("../middlewares/inputValidator");
const karyawanController = require("../controllers/Karyawan/karyawanController");
const karyawanResignController =require('../controllers/Karyawan/resignController')
const karyawanCutiController =require('../controllers/Karyawan/cutiController')
const karyawanMutasiController =require('../controllers/Karyawan/mutasiController')
const karyawanSkillController =require('../controllers/Karyawan/skillController')
const karyawanChallengeController =require('../controllers/Karyawan/challengeController')

// ========================================= RESIGN =========================================
/**
 * @swagger
 * components:
 *   schemas:
 *     ResignAll:
 *       type: object
 *       properties:
 *         karyawanId:
 *           type: string
 *         tglResign:
 *           type: string
 *           format: date
 *         namaLengkap:
 *           type: string
 *         divisi:
 *           type: string
 *         tglBergabung:
 *           type: string
 *           format: date
 *         statusKaryawan:
 *           type: string
 *         handover:
 *           type: string
 *         project:
 *           type: string
 *         tglHandover:
 *           type: string
 *           example: 2020-02-02 - 2023-02-03
 *         posisi:
 *           type: string
 *         penempatan:
 *           type: string
 *         telegramId:
 *           type: string
 *         createdBy:
 *           type: string
 *         createdDate:
 *           type: string
 *           format: date
 *         pendidikanAkhir:
 *           type: string
 *         namaInstitusi:
 *           type: string
 *         status:
 *           type: string
 *         jurusan:
 *           type: string
 *         nikKaryawan:
 *           type: string
 *         year:
 *           type: integer
 *         month:
 *           type: integer
 *         day:
 *           type: integer
 *       additionalProperties: false
 */
/**
 * @swagger
 * /karyawan/resign:
 *  get:
 *    tags: [Resign]
 *    summary: Get all data karyawan resign
 *    description: This api is used to get all data karyawan resign
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/ResignAll'
 */
router.get("/resign", validateToken("admin"), karyawanResignController.getAllKaryawanResign);
/**
 * @swagger
 * tags:
 *   name: Resign
 *   description: API endpoints for resign operations
 * components:
 *   schemas:
 *     AddResign:
 *       type: object
 *       properties:
 *         karyawanId:
 *           type: string
 *         tglResign:
 *           type : string
 *           format: date
 *         handover:
 *           type: string
 *         project:
 *           type: string
 *         tglHandover:
 *           type: string
 *           example: 2020-02-02 - 2023-02-03
 *       required:
 *         - karyawanId
 *         - handover
 *       additionalProperties: false
 */
/**
 * @swagger
 * /karyawan/resign:
 *  post:
 *    tags: [Resign]
 *    summary: Add Resign Karyawan
 *    description: This api is used to add resign karyawan
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/AddResign'
 *    responses:
 *      200:
 *        description: Add resign successfully
 */
router.post("/resign", validateToken("admin"), resignValidator, karyawanResignController.addKaryawanResign);

// ========================================= CUTI =========================================
/**
 * @swagger
 * tags:
 *   name: Cuti
 *   description: API endpoints for cuti operations
 * components:
 *   schemas:
 *     CutiAll:
 *       type: object
 *       properties:
 *         namaLengkap:
 *           type: string
 *         tglResign:
 *           type: string
 *           format: date
 *         keterangan:
 *           type: string
 *         karyawanId:
 *           type: string
 *       additionalProperties: false
 */
/**
 * @swagger
 * /karyawan/cuti:
 *  get:
 *    tags: [Cuti]
 *    summary: Get all data karyawan cuti
 *    description: This api is used to get all data karyawan cuti
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/CutiAll'
 */
router.get("/cuti", validateToken("admin"), karyawanCutiController.getAllKaryawanCuti);
/**
 * @swagger
 * components:
 *   schemas:
 *     AddCuti:
 *       type: object
 *       properties:
 *         namaLengkap:
 *           type: string
 *         tglCuti:
 *           type: string
 *           format: date
 *         keterangan:
 *           type: string
 *       required:
 *         - namaLengkap
 *         - tglCUti
 *       additionalProperties: false
 */
/**
 * @swagger
 * /karyawan/cuti:
 *  post:
 *    tags: [Cuti]
 *    summary: Add Cuti Karyawan
 *    description: This api is used to add cuti karyawan
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/AddCuti'
 *    responses:
 *      200:
 *        description: Add cuti successfully
 */
router.post("/cuti", validateToken("admin"), cutiValidator, karyawanCutiController.addKaryawanCuti);
/**
 * @swagger
 * /user/{namaLengkap}:
 *  delete:
 *    tags: [Cuti]
 *    summary: Delete data cuti
 *    description: This api is used to delete data cuti
 *    parameters:
 *      - in: path
 *        name: namaLengkap
 *        required: true
 *        description: String required
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Delete cuti successfully
 */
router.delete("/cuti/:namaLengkap", validateToken("admin"), karyawanCutiController.deleteKaryawanCuti);

// ========================================= MUTASI =========================================
/**
 * @swagger
 * tags:
 *   name: Mutasi
 *   description: API endpoints for mutasi operations
 * components:
 *   schemas:
 *     MutasiAll:
 *       type: object
 *       properties:
 *         namaLengkap:
 *           type: string
 *         divisi:
 *           type: string
 *         createdBy:
 *           type: string
 *         tglMutasi:
 *           type: string
 *           format: date
 *         tglBergabung:
 *           type: string
 *           format: date
 *         keterangan:
 *           type: string
 *       additionalProperties: false
 */
/**
 * @swagger
 * /karyawan/mutasi:
 *  get:
 *    tags: [Mutasi]
 *    summary: Get all data karyawan mutasi
 *    description: This api is used to get all data karyawan mutasi
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/MutasiAll'
 */
router.get("/mutasi", validateToken("admin"), karyawanMutasiController.getAllKaryawanMutasi);
/**
 * @swagger
 * components:
 *   schemas:
 *     AddMutasi:
 *       type: object
 *       properties:
 *         karyawanId:
 *           type: string
 *         divisi:
 *           type: string
 *         tglMutasi:
 *           type: string
 *           format: date
 *         keterangan:
 *           type: string
 *       required:
 *         - karyawanId
 *         - divisi
 *         - tglMutasi
 *       additionalProperties: false
 */
/**
 * @swagger
 * /karyawan/mutasi:
 *  post:
 *    tags: [Mutasi]
 *    summary: Add Mutasi Karyawan
 *    description: This api is used to add Mutasi karyawan
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/AddMutasi'
 *    responses:
 *      200:
 *        description: Add mutasi successfully
 */
router.post("/mutasi", validateToken("admin"), mutasiValidator, karyawanMutasiController.addKaryawanMutasi);

// ========================================= SKILL =========================================
/**
 * @swagger
 * tags:
 *   name: Skill
 *   description: API endpoints for Skill operations
 * components:
 *   schemas:
 *     SkillAll:
 *       type: object
 *       properties:
 *         namaLengkap:
 *           type: string
 *         skill:
 *           type: string
 *         createdBy:
 *           type: string
 *         timeNow:
 *           type: string
 *           format: date
 *         karyawnId:
 *           type: string
 *       additionalProperties: false
 */
/**
 * @swagger
 * /karyawan/skill:
 *  get:
 *    tags: [Skill]
 *    summary: Get all data karyawan Skill
 *    description: This api is used to get all data karyawan Skill
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/SkillAll'
 */
router.get("/skill", validateToken("admin"), karyawanSkillController.getAllKaryawanSkill);
/**
 * @swagger
 * /karyawan/skill/{namaLengkap}:
 *  get:
 *    tags: [Skill]
 *    summary: Get all data karyawan Skill
 *    description: This api is used to get data karyawan Skill
 *    parameters:
 *      - in: path
 *        name: namaLengkap
 *        required: true
 *        description: String required
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
 *                $ref: '#components/schemas/SkillAll'
 */
router.get("/skill/:namaLengkap", validateToken("admin"), karyawanSkillController.getKaryawanSkill);
/**
 * @swagger
 * components:
 *   schemas:
 *     AddSkill:
 *       type: object
 *       properties:
 *         namaLengkap:
 *           type: string
 *         skill:
 *           type: string
 *           example: GoLang, Node.js, Phyton
 *       required:
 *         - namaLengkap
 *       additionalProperties: false
 */
/**
 * @swagger
 * /karyawan/skill:
 *  post:
 *    tags: [Skill]
 *    summary: Add Skill Karyawan
 *    description: This api is used to add Skill karyawan
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/AddSkill'
 *    responses:
 *      200:
 *        description: Add Skill successfully
 */
router.post("/skill", validateToken("admin"), karyawanSkillController.addKaryawanSkill);
/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateSkill:
 *       type: object
 *       properties:
 *         skill:
 *           type: string
 *           example: GoLang, Node.js, Phyton
 *       required:
 *         - namaLengkap
 *       additionalProperties: false
 */
/**
 * @swagger
 * /karyawan/skill/{namaLengkap}:
 *  put:
 *    tags: [Skill]
 *    summary: Update Skill Karyawan
 *    description: This api is used to Update Skill karyawan
 *    parameters:
 *      - in: path
 *        name: namaLengkap
 *        required: true
 *        description: String required
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/UpdateSkill'
 *    responses:
 *      200:
 *        description: Update Skill successfully
 */
router.put("/skill/:namaLengkap", validateToken("admin"), karyawanSkillController.updateSkillKaryawan);

// ========================================= CHALLENGE =========================================
/**
 * @swagger
 * tags:
 *   name: Challenge
 *   description: API endpoints for Challenge operations
 * components:
 *   schemas:
 *     ChallengeAll:
 *       type: object
 *       properties:
 *         namaLengkap:
 *           type: string
 *         posisi:
 *           type: string
 *         createdBy:
 *           type: string
 *         start:
 *           type: string
 *           format: date
 *         end:
 *           type: string
 *           format: date
 *         createdDate:
 *           type: string
 *           format: date-time
 *       additionalProperties: false
 */
/**
 * @swagger
 * /karyawan/challenge:
 *  get:
 *    tags: [Challenge]
 *    summary: Get all data karyawan Challenge
 *    description: This api is used to get all data karyawan Challenge
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/ChallengeAll'
 */
router.get("/challenge", validateToken("admin"), karyawanChallengeController.getAllKaryawanChallenge);
/**
 * @swagger
 * components:
 *   schemas:
 *     AddChallenge:
 *       type: object
 *       properties:
 *         karyawanId:
 *           type: string
 *         posisi:
 *           type: string
 *         start:
 *           type: string
 *           format: date
 *         end:
 *           type: string
 *           format: date
 *       required:
 *         - karyawanId
 *         - posisi
 *         - start
 *         - end
 *       additionalProperties: false
 */
/**
 * @swagger
 * /karyawan/Challenge:
 *  post:
 *    tags: [Challenge]
 *    summary: Add Challenge Karyawan
 *    description: This api is used to Add Challenge karyawan
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/AddChallenge'
 *    responses:
 *      200:
 *        description: Add Skill successfully
 */
router.post("/challenge", validateToken("admin"), challengeValidator, karyawanChallengeController.addKaryawanChallenge);

// ========================================= KARYAWAN =========================================
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
router.post("/", validateToken("admin"), karyawanValidator, karyawanController.addKaryawan);
/**
 * @swagger
 * /karyawan:
 *  get:
 *    tags: [Karyawan]
 *    summary: Get all data karyawan
 *    description: This api is used to get all data karyawan
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
router.put("/:karyawanId", validateToken("admin"), karyawanValidator, karyawanController.updateKaryawan);
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
router.delete("/:id", validateToken("admin"), karyawanController.deleteKaryawaan);

module.exports = router;

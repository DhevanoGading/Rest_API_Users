const express = require("express");
const router = express.Router();
const { validateToken } = require("../auth");
const karyawanController = require("../controllers/karyawan");

router.post("/", karyawanController.addKaryawan);
router.post("/login", karyawanController.login);
router.post("/logout", karyawanController.logout);

module.exports = router;

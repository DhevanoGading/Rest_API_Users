const express = require('express');
const router = express.Router();
const { validateToken } = require('../middlewares/auth');
const dashboardController = require('../controllers/Dashboard/dashboardPmoController');

router.get("/", validateToken("admin"), dashboardController.dasboardSummary);
router.get("/posisi", validateToken("admin"), dashboardController.dasboardPmoPosisi);
router.get("/status", validateToken("admin"), dashboardController.dasboardPmoStatus);

module.exports = router;
const express = require('express');
const router = express.Router();
const { validateToken } = require('../middlewares/auth');
const dashboardController = require('../controllers/Dashboard/dashboardPmoController');

router.get("/", validateToken("admin"), dashboardController.dasboardSummary);
router.get("/posisi", validateToken("admin"), dashboardController.dasboardPmoPosisi);
router.get("/status", validateToken("admin"), dashboardController.dasboardPmoStatus);
router.get("/pmochart", validateToken("admin"), dashboardController.dasboardPmoChart);
router.get("/pmopercent", validateToken("admin"), dashboardController.dashboardPmoPercent);
router.get("/sharing", validateToken("admin"), dashboardController.dashboardPmoSharing);
router.get("/pmosdoother", validateToken("admin"), dashboardController.dashboardPmoSdoOther);
router.get("/sdodipmo", validateToken("admin"), dashboardController.dashboardSdoDiPmo);
router.get("/pmoforsdo", validateToken("admin"), dashboardController.dasboardPmoForSdo);

module.exports = router;
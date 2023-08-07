const { Karyawan, ChallengeKaryawan } = require("../../models");
const sequelize = require("sequelize");
const { validationResult } = require("express-validator");

module.exports = {
  //get all karyawan challenges
  async getAllKaryawanChallenge(req, res) {
    try {
      const result = await ChallengeKaryawan.findAll({
        attributes: [
          [sequelize.col("Karyawan.namaLengkap"), "namaLengkap"],
          "posisi",
          "createdBy",
          "start",
          "end",
          [
            sequelize.literal(
              `DATE_FORMAT(ChallengeKaryawan.createdDate, '%Y-%m-%d %H:%i:%s')`
            ),
            "createdDate",
          ],
        ],
        include: [
          {
            model: Karyawan,
            attributes: [],
          },
        ],
      });
      res.status(200).json({
        message: "Get Karyawan Challenges Successfully!",
        result,
      });
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).json({
        message: "Error executing query",
        error: error.message,
      });
    }
  },
  async addKaryawanChallenge(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const { karyawanId, posisi, start, end } = req.body;
      const createdBy = req.user.email;
      const createdDate = new Date();

      const karyawan = await Karyawan.findOne({
        where: { karyawanId },
      });

      if (!karyawan) {
        return res.status(404).json({
          message: `Karyawan with id ${karyawanId} not found!`,
        });
      }

      const result = await ChallengeKaryawan.create({
        karyawanId,
        posisi,
        start,
        end,
        createdBy,
        createdDate,
      });

      res.status(200).json({
        message: "Get Karyawan Challenges Successfully!",
        result,
      });
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).json({
        message: "Error executing query",
        error: error.message,
      });
    }
  },
};

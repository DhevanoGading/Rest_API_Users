const { Karyawan, ChallengeKaryawan } = require("../../models");
const sequelize = require("sequelize");

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
            sequelize.literal(`DATE_FORMAT(createdDate, '%Y-%m-%d %H:%i:%s')`),
            "createDate",
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
};

const { Karyawan, ResignKaryawan } = require("../../models");
const sequelize = require("sequelize");
const { validationResult } = require("express-validator");

module.exports = {
  //get all data karyawan resign
  async getAllKaryawanResign(req, res) {
    try {
      const result = await Karyawan.findAll({
        attributes: [
          "karyawanId",
          "tglResign",
          "namaLengkap",
          "divisi",
          "tglBergabung",
          "statusKaryawan",
          [sequelize.col("ResignKaryawan.handover"), "handover"],
          [sequelize.col("ResignKaryawan.tglHandover"), "tglHandover"],
          [sequelize.col("ResignKaryawan.project"), "project"],
          "posisi",
          "penempatan",
          "telegramId",
          [sequelize.col("ResignKaryawan.createdBy"), "createdBy"],
          "createdDate",
          "pendidikanAkhir",
          "namaInstitusi",
          "status",
          "nikKaryawan",
          "jurusan",
          [
            sequelize.literal("TIMESTAMPDIFF(YEAR, tglBergabung, tglResign)"),
            "year",
          ],
          [
            sequelize.literal(
              "TIMESTAMPDIFF(MONTH, tglBergabung, tglResign) % 12"
            ),
            "month",
          ],
          [
            sequelize.literal(
              "FLOOR(TIMESTAMPDIFF(DAY, tglBergabung, tglResign) % 30.4375)"
            ),
            "day",
          ],
        ],
        include: [
          {
            model: ResignKaryawan,
            attributes: [],
          },
        ],
        where: {
          status: "InActive",
        },
      });
      res.status(200).json({
        message: "Get Karyawan Resign Successfully!",
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
  async addKaryawanResign(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const createdBy = req.user.email;
      const status = "InActive";
      const {
        karyawanId,
        tglResign,
        handover,
        project,
        tglHandover,
        keterangan,
      } = req.body;

      const karyawan = await Karyawan.findOne({
        where: { karyawanId },
      });

      if (!karyawan) {
        return res.status(404).json({
          message: `Karyawan with id ${karyawanId} not found!`,
        });
      } else if (karyawan.status == "InActive") {
        return res.status(404).json({
          message: `Karyawan with id ${karyawanId} Already InActive!`,
        });
      }

      const result = await ResignKaryawan.create({
        karyawanId,
        handover,
        project,
        tglHandover,
        keterangan,
        createdBy,
      });

      await Karyawan.update({ tglResign, status }, { where: { karyawanId } });

      res.status(200).json({
        message: "Add Karyawan Resign Successfully!",
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

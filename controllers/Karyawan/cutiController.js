const { Karyawan, CutiKaryawan } = require("../../models");
const sequelize = require("sequelize");
const { validationResult } = require("express-validator");
const op = sequelize.Op;

module.exports = {
  //get all karyawan cuti
  async getAllKaryawanCuti(req, res) {
    try {
      const result = await CutiKaryawan.findAll({
        attributes: [
          "namaLengkap",
          "tglCuti",
          "keterangan",
          [sequelize.col("Karyawan.karyawanId"), "karyawanId"],
        ],
        include: [
          {
            model: Karyawan,
            attributes: [],
          },
        ],
        where: {
          tglCuti: {
            [op.gt]: sequelize.literal("CURDATE() - INTERVAL 30 DAY"),
          },
        },
        order: [["tglCuti", "DESC"]],
      });
      res.status(200).json({
        message: "Get Karyawan Cuti Successfully!",
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
  async addKaryawanCuti(req, res) {
    try {
      //validasi input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const { namaLengkap, tglCuti, keterangan } = req.body;

      const karyawan = await Karyawan.findOne({
        where: { namaLengkap },
      });

      if (!karyawan) {
        return res.status(404).json({
          message: `Karyawan with names ${namaLengkap} not found!`,
        });
      }

      const result = await CutiKaryawan.create(req.body);

      res.status(200).json({
        message: "Add cuti karyawan Successfully!",
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
  async deleteKaryawanCuti(req, res) {
    try {
      const { namaLengkap } = req.params;
      const { tglCuti } = req.query;

      const karyawan = await CutiKaryawan.findOne({
        include: [
          {
            model: Karyawan,
            where: {
              namaLengkap,
            },
          },
        ],
        where: {
          tglCuti,
        },
      });

      if (!karyawan) {
        return res.status(404).json({
          message: `Karyawan or Date not found!`,
        });
      }

      await CutiKaryawan.destroy({ where: { namaLengkap, tglCuti } });

      res.status(200).json({
        message: "Delete Cuti Successfully!",
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

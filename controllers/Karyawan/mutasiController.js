const { Karyawan, MutasiKaryawan } = require("../../models");
const sequelize = require("sequelize");
const { validationResult } = require("express-validator");

module.exports = {
  //get all karyawan mutasi
  async getAllKaryawanMutasi(req, res) {
    try {
      const result = await MutasiKaryawan.findAll({
        attributes: [
          [sequelize.col("Karyawan.namaLengkap"), "namaLengkap"],
          "divisi",
          "createdBy",
          "tglMutasi",
          [sequelize.col("Karyawan.tglBergabung"), "tglBergabung"],
          "keterangan",
        ],
        include: [
          {
            model: Karyawan,
            attributes: [],
          },
        ],
      });

      res.status(200).json({
        message: "Get Karyawan Mutasi Successfully!",
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
  //add mutasi
  async addKaryawanMutasi(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const createdBy = req.user.email;
      const { karyawanId, divisi, tglMutasi, keterangan } = req.body;

      const karyawan = await Karyawan.findOne({
        where: { karyawanId },
      });

      if (!karyawan) {
        return res.status(404).json({
          message: `Karyawan with id ${karyawanId} not found!`,
        });
      }

      const result = await MutasiKaryawan.create({
        karyawanId,
        divisi,
        createdBy,
        tglMutasi,
        keterangan,
      });

      await Karyawan.update({ divisi }, { where: { karyawanId } });

      res.status(200).json({
        message: "Add Karyawan Mutasi Successfully!",
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

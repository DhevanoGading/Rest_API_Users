const { Karyawan } = require("../models");
const { validationResult } = require("express-validator");
// const { paginatedResult } = require("../utils/pagination");
const {
  validateKaryawanData,
  isDataExist,
  validateKaryawanUpdate,
} = require("../utils/validateKaryawan");
const sequelize = require("sequelize");
const operator = sequelize.Op;

module.exports = {
  //tambah karyawan
  async addKaryawan(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const validationMessage = await validateKaryawanData(Karyawan, req.body);
      if (validationMessage) {
        return res.status(409).json({ error: validationMessage });
      }

      const result = await Karyawan.create(req.body);
      res.status(201).json({
        result,
        message: "Add karyawan Successfully!",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
  //get all dat karyawan
  async getAll(req, res) {
    await Karyawan.findAll()
      .then((result) => {
        res.status(200).json({
          count: result.length,
          message: "get all karyawan successfully!",
          result,
        });
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
    //   try {
    //     const page = parseInt(req.query.page) || 1;
    //     const limit = parseInt(req.query.limit) || 10;

    //     const paginatedData = await paginatedResult(Karyawan, page, limit);

    //     const karyawansWithoutPassword = paginatedData.results.map((karyawan) => {
    //       const { password, ...karyawanData } = karyawan.toJSON();
    //       return karyawanData;
    //     });

    //     res.status(200).json({
    //       message: "get karyawan successfully!",
    //       data: {
    //         results: karyawansWithoutPassword,
    //         previous: paginatedData.previous,
    //         next: paginatedData.next,
    //       },
    //     });
    //   } catch (error) {
    //     console.log(error);
    //     res.status(500).json({ message: error.message });
    //   }
  },
  //get karyawan based on id
  async getKaryawan(req, res) {
    const { id } = req.params;

    const karyawan = await Karyawan.findOne({ where: { karyawanId: id } });
    if (!karyawan) {
      return res.status(404).json({ message: "Karyawan not found!" });
    }

    res.status(200).json({
      message: "Get karyawan Successfully!",
      karyawan,
    });
  },
  //update karyawan
  async updateKaryawan(req, res) {
    try {
      const { karyawanId } = req.params;

      const karyawan = await Karyawan.findOne({ where: { karyawanId } });
      if (!karyawan) {
        return res.status(404).json({ message: "Karyawan not found!" });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const validationMessage = await validateKaryawanData(Karyawan, req.body);

      if (
        validationMessage &&
        !(await isDataExist(Karyawan, "karyawanId", karyawanId))
      ) {
        return res.status(409).json({ error: validationMessage });
      }

      const [updatedRows] = await Karyawan.update(req.body, {
        where: { karyawanId },
      });

      if (updatedRows === 0) {
        return res.status(200).json({ error: "Nothing to update!" });
      }

      res.status(201).json({
        message: "Update karyawan successfully!",
      });
    } catch (err) {
      console.error(err);
      const validationMessage = await validateKaryawanUpdate(
        Karyawan,
        req.body
      );
      res.status(500).json({ error: validationMessage });
    }
  },
  //delete karyawan, only admin
  async deleteKaryawaan(req, res) {
    const { id } = req.params;

    const karyawan = await Karyawan.findOne({ where: { karyawanId: id } });
    if (!karyawan) {
      return res.status(404).json({ message: "Karyawan not found!" });
    }

    await Karyawan.destroy({ where: { karyawanId: id } })
      .then((result) => {
        res.status(201).json({
          statusCode: res.statusCode,
          message: "Karyawan has been deleted!",
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
        });
      });
  },
  //search karyawan
  async findKaryawan(req, res) {
    const keyword = req.body.keyword;

    await Karyawan.findAll({
      where: {
        [operator.or]: {
          karyawanId: { [operator.like]: `%${keyword}%` },
          namaLengkap: { [operator.like]: `%${keyword}%` },
          tempatLahir: { [operator.like]: `%${keyword}%` },
          tglLahir: {
            [operator.gte]: `${keyword}-01-01`,
            [operator.lt]: `${parseInt(keyword) + 1}-01-01`,
          },
          email: { [operator.like]: `%${keyword}%` },
          telegramId: { [operator.like]: `%${keyword}%` },
          nomorTelepon: { [operator.like]: `%${keyword}%` },
          jenisIdentitas: { [operator.like]: `%${keyword}%` },
          nomorIdentitas: { [operator.like]: `%${keyword}%` },
          statusPernikahan: { [operator.like]: `%${keyword}%` },
          alamatKtp: { [operator.like]: `%${keyword}%` },
          pendidikanAkhir: { [operator.like]: `%${keyword}%` },
          namaInstitusi: { [operator.like]: `%${keyword}%` },
          jurusan: { [operator.like]: `%${keyword}%` },
          nikKaryawan: { [operator.like]: `%${keyword}%` },
          divisi: { [operator.like]: `%${keyword}%` },
          resource: { [operator.like]: `%${keyword}%` },
          posisi: { [operator.like]: `%${keyword}%` },
          statusKaryawan: { [operator.like]: `%${keyword}%` },
          penempatan: { [operator.like]: `%${keyword}%` },
          tglBergabung: {
            [operator.gte]: `${keyword}-01-01`,
            [operator.lt]: `${parseInt(keyword) + 1}-01-01`,
          },
          userRole: { [operator.like]: `%${keyword}%` },
        },
      },
    })
      .then((result) => {
        res.status(200).json({ count: result.length, data: result });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  },
};

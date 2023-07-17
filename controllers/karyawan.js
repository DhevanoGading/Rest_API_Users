const { Karyawan } = require("../models");
// const { generateTokens } = require("../utils/auth");
const { paginatedResult } = require("../utils/pagination");
const sequelize = require("sequelize");
const operator = sequelize.Op;

module.exports = {
  //tambah karyawan
  async addKaryawan(req, res) {
    const dataKaryawan = {
      karyawanId: req.body.karyawanId,
      namaLengkap: req.body.namaLengkap,
      tempatLahir: req.body.tempatLahir,
      tglLahir: req.body.tglLahir,
      email: req.body.email,
      telegramId: req.body.telegramId,
      nomorTelepon: req.body.nomorTelepon,
      jenisIdentitas: req.body.jenisIdentitas,
      nomorIdentitas: req.body.nomorIdentitas,
      statusPernikahan: req.body.statusPernikahan,
      alamatKtp: req.body.alamatKtp,
      pendidikanAkhir: req.body.pendidikanAkhir,
      namaInstitusi: req.body.namaInstitusi,
      jurusan: req.body.jurusan,
      nikKaryawan: req.body.nikKaryawan,
      divisi: req.body.divisi,
      resource: req.body.resource,
      posisi: req.body.posisi,
      statusKaryawan: req.body.statusKaryawan,
      penempatan: req.body.penempatan,
      tglBergabung: req.body.tglBergabung,
      userRole: req.body.userRole,
    };

    await Karyawan.create(dataKaryawan)
      .then((result) => {
        res.json({
          result,
          message: "Add karyawan Successfully!",
        });
      })
      .catch((err) => {
        res.json({
          message: err.message,
        });
      });
  },
  //get all dat karyawan
  async getAll(req, res) {
    await Karyawan.findAll()
      .then((result) => {
        res.json({
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

    //     res.json({
    //       message: "get karyawan successfully!",
    //       data: {
    //         results: karyawansWithoutPassword,
    //         previous: paginatedData.previous,
    //         next: paginatedData.next,
    //       },
    //     });
    //   } catch (error) {
    //     console.log(error);
    //     res.json({ message: error.message });
    //   }
  },
  //get karyawan based on id
  async getKaryawan(req, res) {
    const { id } = req.params;

    const karyawan = await Karyawan.findOne({ where: { karyawanId: id } });
    if (!karyawan) {
      return res.json({ message: "Karyawan not found!" });
    }
    res.json({
      message: "Get karyawan Successfully!",
      karyawan,
    });
  },
  //update karyawan
  async updateKaryawan(req, res) {
    const { id } = req.params;
    const dataKaryawan = {
      karyawanId: req.body.karyawanId,
      namaLengkap: req.body.namaLengkap,
      tempatLahir: req.body.tempatLahir,
      tglLahir: req.body.tglLahir,
      email: req.body.email,
      telegramId: req.body.telegramId,
      nomorTelepon: req.body.nomorTelepon,
      jenisIdentitas: req.body.jenisIdentitas,
      nomorIdentitas: req.body.nomorIdentitas,
      statusPernikahan: req.body.statusPernikahan,
      alamatKtp: req.body.alamatKtp,
      pendidikanAkhir: req.body.pendidikanAkhir,
      namaInstitusi: req.body.namaInstitusi,
      jurusan: req.body.jurusan,
      nikKaryawan: req.body.nikKaryawan,
      divisi: req.body.divisi,
      resource: req.body.resource,
      posisi: req.body.posisi,
      statusKaryawan: req.body.statusKaryawan,
      penempatan: req.body.penempatan,
      tglBergabung: req.body.tglBergabung,
      userRole: req.body.userRole,
    };

    const karyawan = await Karyawan.findOne({ where: { karyawanId: id } });
    if (!karyawan) {
      return res.json({ message: "Karyawan not found!" });
    }

    await Karyawan.update(dataKaryawan, { where: { karyawanId: id } })
      .then((result) => {
        res.json({
          message: "Update karyawan Successfully!",
          dataKaryawan,
        });
      })
      .catch((err) => {
        res.json({
          message: err.message,
        });
      });
  },
  //delete karyawan, only admin
  async deleteKaryawaan(req, res) {
    const { id } = req.params;

    const karyawan = await Karyawan.findOne({ where: { karyawanId: id } });
    if (!karyawan) {
      return res.json({ message: "Karyawan not found!" });
    }

    await Karyawan.destroy({ where: { karyawanId: id } })
      .then((result) => {
        res.json({
          statusCode: res.statusCode,
          message: "Karyawan has been deleted!",
        });
      })
      .catch((err) => {
        res.json({
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
        res.json({ count: result.length, data: result });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },
  // //login karyawan
  // async login(req, res) {
  //   const requetData = {
  //     email: req.body.email,
  //     password: md5(req.body.password),
  //   };

  //   const karyawan = await Karyawan.findOne({
  //     where: { email: requetData.email },
  //   });

  //   if (!karyawan) {
  //     res.status(400).json({ error: "Email Doesn't Exist!" });
  //   } else {
  //     if (requetData.password !== karyawan.password) {
  //       res.status(400).json({ error: "Invalid password!" });
  //     } else {
  //       const accessToken = generateTokens(karyawan);
  //       res.cookie("access_token", accessToken, {
  //         maxAge: 24 * 60 * 60 * 1000,
  //         httpOnly: true,
  //       });
  //       const { password, ...data } = await karyawan.toJSON();

  //       res.json({
  //         message: "Logged in Succesfully!",
  //         data,
  //       });
  //     }
  //   }
  // },
  // logout(req, res) {
  //   // Hapus cookie 'access_token'
  //   res.clearCookie("access_token");
  //   res.json({ message: "Logged out successfully" });
  // },
};

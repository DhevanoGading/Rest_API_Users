const { Karyawan } = require("../models");
const { generateTokens } = require("../auth");

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
          dataKaryawan,
          message: "Update karyawan Successfully!",
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

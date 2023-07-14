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

    const karyawan = await Karyawan.create(dataKaryawan);

    if (!karyawan) {
      res.status(400).json({ error: "add karyawan failed!" });
    } else {
      const { password, ...data } = await karyawan.toJSON();

      res.json({
        message: "add karyawan successfully!",
        data,
      });
    }
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

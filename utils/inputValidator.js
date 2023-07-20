const { check } = require("express-validator");

exports.userValidator = [
  check("email").isEmail().withMessage("Format Email isn't suitable"),
  check("password")
    .notEmpty()
    .withMessage(`Password must be filled`)
    .isLength({ min: 6 })
    .withMessage(`Password at least 6 characters`),
];

exports.karyawanValidator = [
  check("karyawanId").notEmpty().withMessage("Karyawan ID must be filled!"),
  check("namaLengkap").notEmpty().withMessage("Nama Lengkap must be filled!"),
  check("tempatLahir").notEmpty().withMessage("Tempat Lahir must be filled!"),
  check("tglLahir")
    .notEmpty()
    .withMessage("Tanggal Lahir must be filled!")
    .isDate()
    .withMessage("Invalid Date!"),
  check("email")
    .notEmpty()
    .withMessage("Email must be filled!")
    .isEmail()
    .withMessage("Format Email isn't suitable"),
  check("telegramId").notEmpty().withMessage("Telegram ID must be filled!"),
  check("nomorTelepon")
    .notEmpty()
    .withMessage("Nomor Telepon must be filled!")
    .isMobilePhone("id-ID")
    .withMessage("Invalid Phone Number!"),
  check("jenisIdentitas")
    .notEmpty()
    .withMessage("Jenis Identitas must be filled!"),
  check("nomorIdentitas")
    .notEmpty()
    .withMessage("Nomor Identitas must be filled!")
    .isNumeric()
    .withMessage("Nomor Identitas number must only contain numeric characters"),
  check("statusPernikahan")
    .notEmpty()
    .withMessage("Status Pernikahan must be filled!"),
  check("alamatKtp").notEmpty().withMessage("Alamat KTP must be filled!"),
  check("pendidikanAkhir")
    .notEmpty()
    .withMessage("Pendidikan akhir must be filled!"),
  check("namaInstitusi")
    .notEmpty()
    .withMessage("Nama Institusi must be filled!"),
  check("jurusan").notEmpty().withMessage("Jurusan must be filled!"),
  check("nikKaryawan").notEmpty().withMessage("NIK Karyawan must be filled!"),
  check("divisi").notEmpty().withMessage("Divisi must be filled!"),
  check("resource").notEmpty().withMessage("Resource must be filled!"),
  check("posisi").notEmpty().withMessage("Posisi must be filled!"),
  check("statusKaryawan")
    .notEmpty()
    .withMessage("Status Karyawan must be filled!"),
  check("penempatan").notEmpty().withMessage("Penempatan must be filled!"),
  check("tglBergabung")
    .notEmpty()
    .withMessage("Tgl Bergabung must be filled!")
    .isDate()
    .withMessage("Invalid Date!"),
  check("userRole").notEmpty().withMessage("User Role must be filled!"),
];

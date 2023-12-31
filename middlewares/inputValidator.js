const { check } = require("express-validator");

exports.userValidator = [
  check("email")
    .notEmpty()
    .withMessage(`Password must be filled!`)
    .isEmail()
    .withMessage("Format Email isn't suitable"),
  check("password")
    .notEmpty()
    .withMessage(`Password must be filled!`)
    .isLength({ min: 6 })
    .withMessage(`Password at least 6 characters!`),
];

exports.userUpdateValidator = [
  check("email")
    .notEmpty()
    .withMessage(`Password must be filled!`)
    .isEmail()
    .withMessage("Format Email isn't suitable"),
  check("role").notEmpty().withMessage(`Role must be filled!`),
];

exports.roleValidator = [
  check("role").notEmpty().withMessage(`Role must be filled!`),
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
    .withMessage("Tanggal Bergabung must be filled!")
    .isDate()
    .withMessage("Invalid Date!"),
  check("userRole").notEmpty().withMessage("User Role must be filled!"),
];

exports.cutiValidator = [
  check("namaLengkap").notEmpty().withMessage(`Choose a karyawan!`),
  check("tglCuti").notEmpty().withMessage(`Tanggal Cuti must be filled!`),
];

exports.mutasiValidator = [
  check("karyawanId").notEmpty().withMessage(`Choose a karyawan!`),
  check("divisi").notEmpty().withMessage(`Divisi must be filled!`),
];

exports.resignValidator = [
  check("karyawanId").notEmpty().withMessage(`Choose a karyawan!`),
  check("handover").notEmpty().withMessage(`Handover must be filled!`),
  check("tglResign").notEmpty().withMessage(`Tanggal Resign must be filled!`),
];

exports.challengeValidator = [
  check("karyawanId").notEmpty().withMessage(`Choose a karyawan!`),
  check("posisi").notEmpty().withMessage(`Posisi must be filled!`),
  check("start").notEmpty().withMessage(`Start Challenge must be filled!`),
  check("end").notEmpty().withMessage(`End Challenge must be filled!`),
];

exports.assignmentValidator = [
  check("karyawanId").notEmpty().withMessage(`Choose a karyawan!`),
  check("boardId").notEmpty().withMessage(`Choose a Project!`),
  check("pm").notEmpty().withMessage(`Choose a Project Manager!`),
  check("assignmentType")
    .notEmpty()
    .withMessage(`Assignment Type must be filled!`),
  check("assignmentDate")
    .notEmpty()
    .withMessage(`Assignment Date must be filled!`),
];

exports.updateAssignmentValidator = [
  check("assignmentType")
    .notEmpty()
    .withMessage(`Assignment Type must be filled!`),
  check("assignmentDate")
    .notEmpty()
    .withMessage(`Assignment Date must be filled!`),
];

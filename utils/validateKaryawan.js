isDataExist = async (Karyawan, field, value) => {
  const existingData = await Karyawan.findOne({ where: { [field]: value } });
  return existingData !== null;
};

validateKaryawanData = async (Karyawan, data) => {
  const {
    karyawanId,
    email,
    telegramId,
    nomorTelepon,
    nomorIdentitas,
    nikKaryawan,
  } = data;

  if (await isDataExist(Karyawan, "karyawanId", karyawanId)) {
    return "Karyawan Id already exists!";
  }

  if (await isDataExist(Karyawan, "email", email)) {
    return "Email already exists!";
  }

  if (await isDataExist(Karyawan, "telegramId", telegramId)) {
    return "Telegram Id already exists!";
  }

  if (await isDataExist(Karyawan, "nomorTelepon", nomorTelepon)) {
    return "Nomor Telepon already exists!";
  }

  if (await isDataExist(Karyawan, "nomorIdentitas", nomorIdentitas)) {
    return "Nomor Identitas already exists!";
  }

  if (await isDataExist(Karyawan, "nikKaryawan", nikKaryawan)) {
    return "NIK Karyawan already exists!";
  }

  return null;
};

validateKaryawanUpdate = async (Karyawan, data) => {
  const {
    karyawanId,
    email,
    telegramId,
    nomorTelepon,
    nomorIdentitas,
    nikKaryawan,
  } = data;

  if (await isDataExist(Karyawan, "email", email)) {
    return "Email already exists!";
  }

  if (await isDataExist(Karyawan, "telegramId", telegramId)) {
    return "Telegram Id already exists!";
  }

  if (await isDataExist(Karyawan, "nomorTelepon", nomorTelepon)) {
    return "Nomor Telepon already exists!";
  }

  if (await isDataExist(Karyawan, "nomorIdentitas", nomorIdentitas)) {
    return "Nomor Identitas already exists!";
  }

  if (await isDataExist(Karyawan, "nikKaryawan", nikKaryawan)) {
    return "NIK Karyawan already exists!";
  }

  return null;
};

module.exports = { isDataExist, validateKaryawanData, validateKaryawanUpdate };

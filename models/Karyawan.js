module.exports = (sequelize, DataTypes) => {
  const Karyawan = sequelize.define(
    "Karyawan",
    {
      karyawanId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      namaLengkap: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      tempatLahir: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      tglLahir: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      telegramId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      nomorTelepon: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      jenisIdentitas: {
        type: DataTypes.ENUM("KTP", "SIM"),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      nomorIdentitas: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      statusPernikahan: {
        type: DataTypes.ENUM("Lajang", "Menikah", "Janda", "Duda"),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      alamatKtp: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      pendidikanAkhir: {
        type: DataTypes.ENUM(
          "SMK/SMU/Sederajat",
          "D1",
          "D2",
          "D3",
          "S1",
          "S2",
          "S3"
        ),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      namaInstitusi: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      jurusan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      nikKaryawan: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      divisi: {
        type: DataTypes.ENUM("RMO", "PMO", "BSO", "SDO", "DSO", "KMO", "BO"),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      resource: {
        type: DataTypes.ENUM("RMO", "PMO", "BSO", "SDO", "DSO", "KMO", "BO"),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      posisi: {
        type: DataTypes.ENUM(
          "Developer",
          "Developer Analyst",
          "System Analyst",
          "Project Manager",
          "Project Admin",
          "Quality Control",
          "Technical Writer",
          "Data Scientist",
          "Support Surveillance",
          "Support Leader",
          "Support Specialist",
          "Subject Matter Expert",
          "UI/UX",
          "System Architect",
          "Digital Solutions Senior Officer",
          "RF Engineer",
          "System Administrator",
          "Senior Training Officer",
          "Field Engineer Radar",
          "Data Analyst",
          "Consultant",
          "Lingustict",
          "Radar Engineer",
          "Inventory Admin",
          "Machine Learning Engineer"
        ),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      statusKaryawan: {
        type: DataTypes.ENUM("Permanent", "Fixed-term contracts", "Freelance"),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      penempatan: {
        type: DataTypes.ENUM("Jakarta", "Yogyakarta"),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      tglBergabung: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      userRole: {
        type: DataTypes.ENUM(
          "HRD",
          "PMO Admin",
          "PMO Employee",
          "BSO Admin",
          "BSO Employee",
          "SDO Admin",
          "SDO Employee",
          "RMO Admin",
          "RMO Employee",
          "Trello Admin",
          "Project Manager",
          "System Analyst",
          "Finance"
        ),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      timestamps: false,
    }
  );
  return Karyawan;
};

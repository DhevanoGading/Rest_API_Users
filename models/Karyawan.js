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
        unique: true,
        allowNull: false,
      },
      tempatLahir: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      tglLahir: {
        type: "DATE",
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      telegramId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      nomorTelepon: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      jenisIdentitas: {
        type: DataTypes.ENUM("KTP", "SIM"),
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      nomorIdentitas: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      statusPernikahan: {
        type: DataTypes.ENUM("Lajang", "Menikah", "Janda", "Duda"),
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      alamatKtp: {
        type: DataTypes.TEXT,
        allowNull: true,
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
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      namaInstitusi: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      jurusan: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      nikKaryawan: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      divisi: {
        type: DataTypes.ENUM(
          "RMO",
          "PMO",
          "BSO",
          "SDO",
          "DSO",
          "KMO",
          "BO",
          "Quality Control"
        ),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      resource: {
        type: DataTypes.ENUM(
          "RMO",
          "PMO",
          "BSO",
          "SDO",
          "DSO",
          "KMO",
          "BO",
          "QC"
        ),
        allowNull: false,
        defaultValue: "RMO",
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
          "Linguistict",
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
        allowNull: true,
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
        type: "DATE",
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
      status: {
        type: DataTypes.ENUM("Active", "InActive"),
        defaultValue: "Active",
        allowNull: false,
      },
      tglResign: {
        type: "DATE",
        allowNull: true,
      },
      roleTrello: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdDate: {
        type: DataTypes.STRING,
        defaultValue: new Date().toISOString().slice(0, 10),
      },
      createdBy: {
        type: DataTypes.STRING,
        defaultValue: "arief.dolants",
      },
    },
    {
      timestamps: false,
      indexes: [
        {
          fields: ["namaLengkap"],
        },
      ],
    }
  );

  Karyawan.associate = (models) => {
    Karyawan.hasOne(models.TrelloKaryawan, {
      foreignKey: "namaLengkap",
      targetKey: "namaLengkap",
    });
    Karyawan.hasOne(models.ResignKaryawan, {
      foreignKey: "karyawanId",
      targetKey: "karyawanId",
    });
    Karyawan.hasMany(models.CutiKaryawan, {
      foreignKey: "namaLengkap",
      targetKey: "namaLengkap",
    });
    Karyawan.hasMany(models.MutasiKaryawan, {
      foreignKey: "karyawanId",
      targetKey: "karyawanId",
    });
    Karyawan.hasOne(models.Skill, {
      foreignKey: "namaLengkap",
      targetKey: "namaLengkap",
    });
    Karyawan.hasMany(models.ChallengeKaryawan, {
      foreignKey: "karyawanId",
      targetKey: "karyawanId",
    });
    Karyawan.hasMany(models.AssignmentKaryawan, {
      foreignKey: "karyawanId",
      targetKey: "karyawanId",
    });
  };

  return Karyawan;
};

module.exports = (sequelize, DataTypes) => {
  const MutasiKaryawan = sequelize.define(
    "MutasiKaryawan",
    {
      karyawanId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      divisi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdDate: {
        type: "DATE",
        defaultValue: new Date().toISOString().slice(0, 10),
      },
      tglMutasi: {
        type: "DATE",
        defaultValue: new Date().toISOString().slice(0, 10),
      },
      keterangan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

  MutasiKaryawan.associate = (models) => {
    MutasiKaryawan.belongsTo(models.Karyawan, {
      foreignKey: "karyawanId",
      targetKey: "karyawanId",
      onUpdate: "CASCADE",
    });
  };

  return MutasiKaryawan;
};

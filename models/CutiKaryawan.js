module.exports = (sequelize, DataTypes) => {
  const CutiKaryawan = sequelize.define(
    "CutiKaryawan",
    {
      namaLengkap: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tglCuti: {
        type: "DATE",
        allowNull: false,
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

  CutiKaryawan.associate = (models) => {
    CutiKaryawan.belongsTo(models.Karyawan, {
      foreignKey: "namaLengkap",
      targetKey: "namaLengkap",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  };

  return CutiKaryawan;
};

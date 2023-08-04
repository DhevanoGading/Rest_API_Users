module.exports = (sequelize, DataTypes) => {
  const ResignKaryawan = sequelize.define(
    "ResignKaryawan",
    {
      karyawanId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      handover: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      project: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tglHandover: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  ResignKaryawan.associate = (models) => {
    ResignKaryawan.belongsTo(models.Karyawan, {
      foreignKey: "karyawanId",
      targetKey: "karyawanId",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  };

  return ResignKaryawan;
};

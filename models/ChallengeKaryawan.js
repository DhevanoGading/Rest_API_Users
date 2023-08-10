module.exports = (sequelize, DataTypes) => {
  const ChallengeKaryawan = sequelize.define(
    "ChallengeKaryawan",
    {
      karyawanId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      posisi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start: {
        type: "DATE",
        allowNull: false,
      },
      end: {
        type: "DATE",
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      timestamps: false,
    }
  );

  ChallengeKaryawan.associate = (models) => {
    ChallengeKaryawan.belongsTo(models.Karyawan, {
      foreignKey: "karyawanId",
      targetKey: "karyawanId",
      onUpdate: "CASCADE",
    });
  };

  return ChallengeKaryawan;
};

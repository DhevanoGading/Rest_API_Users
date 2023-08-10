module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define(
    "Skill",
    {
      namaLengkap: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      skill: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "arief.dolants",
      },
      timeNow: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      timestamps: false,
    }
  );

  Skill.associate = (models) => {
    Skill.belongsTo(models.Karyawan, {
      foreignKey: "namaLengkap",
      targetKey: "namaLengkap",
      onUpdate: "CASCADE",
    });
  };

  return Skill;
};

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
        defaultValue: "arief.dolants",
      },
      timeNow: {
        type: "DATE",
        defaultValue: new Date().toISOString().slice(0, 10),
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
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  };

  return Skill;
};

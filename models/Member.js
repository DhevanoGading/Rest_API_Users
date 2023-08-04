module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define(
    "Member",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      namaLengkap: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Member.associate = (models) => {
    Member.belongsTo(models.Karyawan, {
      foreignKey: "namaLengkap",
      targetKey: "namaLengkap",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  };

  return Member;
};

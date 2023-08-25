module.exports = (sequelize, DataTypes) => {
  const TrelloKaryawan = sequelize.define(
    "TrelloKaryawan",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      namaLengkap: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      indexes: [
        {
          fields: ["username"],
        },
      ],
    }
  );

  TrelloKaryawan.associate = (models) => {
    TrelloKaryawan.belongsTo(models.Karyawan, {
      foreignKey: "namaLengkap",
      targetKey: "namaLengkap",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
    TrelloKaryawan.hasMany(models.Boardaction, {
      foreignKey: "username",
      targetKey: "username",
    });
  };

  return TrelloKaryawan;
};

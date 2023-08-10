module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    "Client",
    {
      clientId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nama: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      alamat: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdDate: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: new Date()
          .toISOString()
          .replace("T", " ")
          .substring(0, 19),
      },
    },
    {
      timestamps: false,
    }
  );

  Client.associate = (models) => {
    Client.hasMany(models.ProjectSetting, {
      foreignKey: "clientId",
      targetKey: "clientId",
    });
  };
  return Client;
};

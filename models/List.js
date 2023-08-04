module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define(
    "List",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idBoard: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pos: {
        type: DataTypes.REAL,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return List;
};

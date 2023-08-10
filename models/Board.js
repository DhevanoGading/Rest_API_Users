module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    "Board",
    {
      boardId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      idOrganization: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shortUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateLastActivity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

  Board.associate = (models) => {
    Board.hasMany(models.AssignmentKaryawan, {
      foreignKey: "boardId",
      targetKey: "boardId",
    });
    Board.hasOne(models.ProjectSetting, {
      foreignKey: "boardId",
      targetKey: "boardId",
    });
  };

  return Board;
};

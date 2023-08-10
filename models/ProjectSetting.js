module.exports = (sequelize, DataTypes) => {
  const ProjectSetting = sequelize.define(
    "ProjectSetting",
    {
      boardId: {
        type: DataTypes.STRING,
      },
      pm: {
        type: DataTypes.STRING,
      },
      clientId: {
        type: DataTypes.INTEGER,
      },
      projectType: {
        type: DataTypes.STRING,
      },
      nilaiProject: {
        type: DataTypes.STRING,
      },
      mandays: {
        type: DataTypes.STRING,
      },
      startDate: {
        type: "DATE",
      },
      endDate: {
        type: "DATE",
      },
      projectDiv: {
        type: DataTypes.STRING,
      },
      createdBy: {
        type: DataTypes.STRING,
      },
      timeNow: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: new Date()
          .toISOString()
          .replace("T", " ")
          .substring(0, 19),
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "ACTIVE",
      },
      noPo: {
        type: DataTypes.STRING,
      },
      namaPo: {
        type: DataTypes.STRING,
      },
      noProject: {
        type: DataTypes.STRING,
      },
      namaProject: {
        type: DataTypes.STRING,
      },
      invoice1: {
        type: DataTypes.STRING,
      },
      invoice2: {
        type: DataTypes.STRING,
      },
      keterangan: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  ProjectSetting.associate = (models) => {
    ProjectSetting.belongsTo(models.Client, {
      foreignKey: "clientId",
      targetKey: "clientId",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
    ProjectSetting.belongsTo(models.Board, {
      foreignKey: "boardId",
      targetKey: "boardId",
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  };
  return ProjectSetting;
};

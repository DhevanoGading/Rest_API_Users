module.exports = (sequelize, DataTypes) => {
  const AssignmentKaryawan = sequelize.define(
    "AssignmentKaryawan",
    {
      assignmentId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      karyawanId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      boardId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pm: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assignmentType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assignmentDate: {
        type: "DATE",
        allowNull: false,
      },
      assignmentEnd: {
        type: "DATE",
        allowNull: true,
      },
      assignmentExtend: {
        type: "DATE",
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "ACTIVE",
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "arief.dolants",
      },
      timeNow: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: new Date()
          .toISOString()
          .replace("T", " ")
          .substring(0, 19),
      },
      crName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

  AssignmentKaryawan.associate = (models) => {
    AssignmentKaryawan.belongsTo(models.Karyawan, {
      foreignKey: "karyawanId",
      targetKey: "karyawanId",
      onUpdate: "CASCADE",
    });
    AssignmentKaryawan.belongsTo(models.Board, {
      foreignKey: "boardId",
      targetKey: "boardId",
      onUpdate: "CASCADE",
    });
  };
  return AssignmentKaryawan;
};

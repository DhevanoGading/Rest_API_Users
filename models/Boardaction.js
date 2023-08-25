module.exports = (sequelize, DataTypes) => {
  const Boardaction = sequelize.define(
    "Boardaction",
    {
      boardactionId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      boardId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      listId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cardId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tanggal: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      creatorId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      namaLengkap: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      attachmentId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      attachmentName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      attachmentUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      memberId: {
        type: DataTypes.CHAR(100),
        allowNull: true,
      },
      memberUsername: {
        type: DataTypes.CHAR(100),
        allowNull: true,
      },
      memberNamaLengkap: {
        type: DataTypes.CHAR(100),
        allowNull: true,
      },
      cardSourceId: {
        type: DataTypes.CHAR(100),
        allowNull: true,
      },
      cardSourceName: {
        type: DataTypes.CHAR(100),
        allowNull: true,
      },
      boardSourceId: {
        type: DataTypes.CHAR(100),
        allowNull: true,
      },
      checklistName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      checkitemName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      checkitemState: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

  Boardaction.associate = (models) => {
    Boardaction.belongsTo(models.TrelloKaryawan, {
      foreignKey: "username",
      targetKey: "username",
      onUpdate: "CASCADE",
    });
    Boardaction.belongsTo(models.Board, {
      foreignKey: "boardId",
      targetKey: "boardId",
      onUpdate: "CASCADE",
    });
  };

  return Boardaction;
};

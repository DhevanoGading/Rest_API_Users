module.exports = (sequelize, DataTypes) => {
  const Action = sequelize.define(
    "Action",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      idMemberCreator: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      cardId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cardName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cardShortLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      boardId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      boardName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      boardShortLink: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      listId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      listName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
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
  return Action;
};

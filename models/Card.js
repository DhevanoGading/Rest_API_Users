module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define(
    "Card",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      idCard: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateLastActivity: {
        type: "DATE",
        allowNull: false,
      },
      desc: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      idBoard: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idList: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idMembers: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      shortLink: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pos: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      shortUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Card;
};

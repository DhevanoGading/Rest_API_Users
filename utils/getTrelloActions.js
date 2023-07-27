require("dotenv").config();
const APIKey = process.env.API_KEY;
const APIToken = process.env.API_TOKEN;
const BaseUrl = process.env.BASE_TRELLO_URL;
const boardId = process.env.BASE_BOARD_ID;
const { Activity } = require("../models");

const getLastActivity = async () => {
  try {
    const latesActivity = await Activity.findOne({
      order: [["date", "DESC"]],
    });

    if (latesActivity) {
      return latesActivity.date;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

const getTrelloActions = async () => {
  try {
    const responseTrello = await fetch(
      `${BaseUrl}boards/${boardId}/actions?key=${APIKey}&token=${APIToken}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (responseTrello.ok) {
      const data = await responseTrello.json();

      let lastPollingTime = await getLastActivity();
      const lastActivityTime = new Date(lastPollingTime)
        .toISOString()
        .slice(0, -5);

      const newActions = data.filter((action) => {
        const actionDate = action.date.slice(0, -5);

        return !lastPollingTime || actionDate > lastActivityTime;
      });

      if (newActions.length > 0) {
        for (const item of newActions) {
          const {
            id,
            idMemberCreator,
            data: { text, card, board, list },
            type,
            date,
            memberCreator: { fullName, username },
          } = item;

          await Activity.create({
            id,
            idMemberCreator,
            text: text ? text : null,
            cardId: card ? card.id : null,
            cardName: card ? card.name : null,
            cardShortLink: card ? card.shortLink : null,
            boardId: board.id,
            boardName: board.name,
            boardShortLink: board.shortLink,
            listId: list ? list.id : null,
            listName: list ? list.name : null,
            type,
            date,
            fullName: fullName,
            username: username,
          });
        }

        return console.log({
          message: "Get New Actions Successfully!",
          trello: newActions,
        });
      } else {
        return console.log({
          message: "No New Activities!",
        });
      }
    } else {
      console.log({
        trello: "Operating trello failed!",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getTrelloActions };

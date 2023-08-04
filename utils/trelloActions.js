require("dotenv").config();
const APIKey = process.env.API_KEY;
const APIToken = process.env.API_TOKEN;
const BaseUrl = process.env.BASE_TRELLO_URL;
const boardId = process.env.BASE_BOARD_ID;
const { Action } = require("../models");

const getLastAction = async () => {
  try {
    const latesAction = await Action.findOne({
      order: [["date", "DESC"]],
      attributes: ["date"],
    });

    return latesAction ? latesAction.date : null;
  } catch (err) {
    console.log(err);
  }
};

const processGetActions = async (actions) => {
  const createdActions = [];
  const updatedActions = [];

  for (const item of actions) {
    const {
      id,
      idMemberCreator,
      data: { text, card, board, list },
      type,
      date,
      memberCreator: { fullName, username },
    } = item;

    const actionData = {
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
    };

    const existingAction = await Action.findOne({
      where: { id: id },
    });

    if (!existingAction) {
      await Action.create(actionData);
      createdActions.push(actionData);
    } else if (existingAction.text != text) {
      await Action.update(actionData, {
        where: { id: id },
      });
      updatedActions.push(actionData);
    }
  }
  return { createdActions, updatedActions };
};

const deleteActionsNotInTrello = async (trelloIds) => {
  try {
    const dbIds = await Action.findAll({
      attributes: ["id"],
    });

    const idsToDelete = dbIds
      .map((action) => action.id)
      .filter((dbId) => !trelloIds.includes(dbId));

    if (idsToDelete.length > 0) {
      await Action.destroy({
        where: {
          id: idsToDelete,
        },
      });
      console.log({
        message: `Deleted action with id ${idsToDelete}!`,
      });
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error deleting actions not in Trello:", error);
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

      // let lastPollingTime = await getLastAction();
      // const lastActionTime = lastPollingTime
      //   ? new Date(lastPollingTime).toISOString().slice(0, -5)
      //   : null;

      // const newActions = data.filter((action) => {
      //   const actionDate = action.date.slice(0, -5);

      //   return !lastPollingTime || actionDate > lastActionTime;
      // });

      // if (newActions.length > 0) {
      const { createdActions, updatedActions } = await processGetActions(data);

      const trelloIds = data.map((action) => action.id);

      await deleteActionsNotInTrello(trelloIds);

      if (createdActions.length > 0 || updatedActions.length > 0) {
        console.log({
          message: "Get New Actions Successfully!",
          createdActions,
          updatedActions,
        });
      } else {
        console.log({
          message: "No New and Updated Actions!",
        });
      }
      // } else {
      //   console.log({
      //     message: "No New Actions!",
      //   });
      // }
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

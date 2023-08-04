require("dotenv").config();
const APIKey = process.env.API_KEY;
const APIToken = process.env.API_TOKEN;
const BaseUrl = process.env.BASE_TRELLO_URL;
const boardId = process.env.BASE_BOARD_ID;
const { List } = require("../models");

const processGetLists = async (lists) => {
  const createdLists = [];
  const updatedLists = [];

  for (const item of lists) {
    const { id, name, idBoard, pos } = item;

    const listData = {
      id,
      name,
      idBoard,
      pos,
    };

    const existingList = await List.findOne({
      where: { id: id },
    });
    if (!existingList) {
      await List.create(listData);
      createdLists.push(listData);
    } else {
      const isDiff =
        listData.id !== existingList.id ||
        listData.name !== existingList.name ||
        listData.idBoard !== existingList.idBoard ||
        listData.pos !== existingList.pos ||
        false;

      if (isDiff) {
        await List.update(listData, { where: { id: listData.id } });
        updatedLists.push(listData);
      }
    }
  }
  return { createdLists, updatedLists };
};

const getTrelloLists = async () => {
  try {
    const responseTrello = await fetch(
      `${BaseUrl}boards/${boardId}/lists?key=${APIKey}&token=${APIToken}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (responseTrello.ok) {
      const data = await responseTrello.json();

      const { createdLists, updatedLists } = await processGetLists(data);

      if (createdLists.length > 0) {
        console.log({
          message: "Get New Lists Successfully!",
          createdLists,
          updatedLists,
        });
      } else {
        console.log({
          message: "No New and Updated Lists!",
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

module.exports = { getTrelloLists };

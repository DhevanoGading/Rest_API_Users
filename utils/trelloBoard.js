require("dotenv").config();
const APIKey = process.env.API_KEY;
const APIToken = process.env.API_TOKEN;
const BaseUrl = process.env.BASE_TRELLO_URL;
const boardId = process.env.BASE_BOARD_ID;
const { Board } = require("../models");

const getTrelloBoard = async () => {
  try {
    const responseTrello = await fetch(
      `${BaseUrl}boards/${boardId}?key=${APIKey}&token=${APIToken}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (responseTrello.ok) {
      const data = await responseTrello.json();

      const boardData = {
        id: data.id,
        name: data.name,
        desc: data.desc,
        idOrganization: data.idOrganization,
        url: data.url,
        shortUrl: data.shortUrl,
      };

      const existingBoard = await Board.findOne({
        where: { id: boardData.id },
      });

      if (!existingBoard) {
        await Board.create(boardData);
      } else {
        console.log({ message: "nothing to get board" });
      }
    } else {
      console.log({
        trello: "Operating trello failed!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getTrelloBoard };

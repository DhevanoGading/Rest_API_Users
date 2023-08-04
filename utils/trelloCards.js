require("dotenv").config();
const APIKey = process.env.API_KEY;
const APIToken = process.env.API_TOKEN;
const BaseUrl = process.env.BASE_TRELLO_URL;
const boardId = process.env.BASE_BOARD_ID;
const { Card } = require("../models");

const processGetCards = async (cards) => {
  const createdCards = [];
  const updatedCards = [];

  for (const item of cards) {
    const {
      id,
      name,
      dateLastActivity,
      desc,
      idBoard,
      idList,
      idMembers,
      pos,
      shortLink,
      shortUrl,
      url,
    } = item;

    const cardData = {
      idCard: id,
      name,
      dateLastActivity,
      desc: desc ? desc : null,
      idBoard,
      idList,
      idMembers,
      pos,
      shortLink,
      shortUrl,
      url,
    };

    const existingCard = await Card.findOne({
      where: { idCard: id },
    });

    if (!existingCard) {
      if (cardData.idMembers.length == 0) {
        cardData.idMembers = null;
        await Card.create(cardData);
        createdCards.push(cardData);
      } else {
        for (let i = 0; i < cardData.idMembers.length; i++) {
          let membersData = {
            idCard: id,
            name,
            dateLastActivity,
            desc: desc ? desc : null,
            idBoard,
            idList,
            idMembers: cardData.idMembers[i],
            pos,
            shortLink,
            shortUrl,
            url,
          };
          await Card.create(membersData);
          createdCards.push(membersData);
        }
      }
    } else {
      if (cardData.idMembers.length == 0) {
        const isDiff =
          existingCard.name !== cardData.name ||
          existingCard.dateLastActivity !== cardData.dateLastActivity ||
          existingCard.desc !== cardData.desc ||
          existingCard.idBoard !== cardData.idBoard ||
          existingCard.idList !== cardData.idList ||
          existingCard.shortLink !== cardData.shortLink ||
          existingCard.shortUrl !== cardData.shortUrl ||
          existingCard.url !== cardData.url ||
          false;

        if (isDiff) {
          await Card.update(cardData);
          updatedCards.push(cardData);
        }
      } else {
        const existingMembers = existingCard.idMembers || [];
        const newMembers = cardData.idMembers || [];
        const membersToAdd = newMembers.filter(
          (member) => !existingMembers.includes(member)
        );
        const membersToRemove = existingMembers.filter(
          (member) => !newMembers.includes(member)
        );

        if (
          membersToAdd.length > 0 ||
          membersToRemove.length > 0 ||
          existingCard.name !== cardData.name ||
          existingCard.dateLastActivity !== cardData.dateLastActivity ||
          existingCard.desc !== cardData.desc ||
          existingCard.idBoard !== cardData.idBoard ||
          existingCard.idList !== cardData.idList ||
          existingCard.shortLink !== cardData.shortLink ||
          existingCard.shortUrl !== cardData.shortUrl ||
          existingCard.url !== cardData.url
        ) {
          await Card.update(cardData);
          updatedCards.push(cardData);
        }

        for (const memberId of membersToAdd) {
          let memberCardData = {
            idCard: id,
            name,
            dateLastActivity,
            desc: desc ? desc : null,
            idBoard,
            idList,
            idMembers: memberId,
            pos,
            shortLink,
            shortUrl,
            url,
          };
          await Card.create(memberCardData);
          createdCards.push(memberCardData);
        }
        for (const memberId of membersToRemove) {
          await Card.destroy({
            where: {
              idCard: id,
              idMembers: memberId,
            },
          });
        }
      }
    }
  }
  return { createdCards, updatedCards };
};

const getTrelloCards = async () => {
  try {
    const responseTrello = await fetch(
      `${BaseUrl}boards/${boardId}/cards?key=${APIKey}&token=${APIToken}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (responseTrello.ok) {
      const data = await responseTrello.json();

      const { createdCards, updatedCards } = await processGetCards(data);

      if (createdCards.length > 0) {
        console.log({
          message: "Get New Cards Successfully!",
          createdCards,
          updatedCards,
        });
      } else {
        console.log({
          message: "No New and Updated Cards!",
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

module.exports = { getTrelloCards };

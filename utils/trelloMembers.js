require("dotenv").config();
const APIKey = process.env.API_KEY;
const APIToken = process.env.API_TOKEN;
const BaseUrl = process.env.BASE_TRELLO_URL;
const boardId = process.env.BASE_BOARD_ID;
const { Member } = require("../models");

const processGetMembers = async (members) => {
  const createdMembers = [];
  const updatedMembers = [];

  for (const item of members) {
    const { id, fullName, username } = item;

    const memberData = {
      id,
      namaLengkap: fullName,
      username,
    };

    const existingMember = await Member.findOne({
      where: { id: id },
    });
    if (!existingMember) {
      await Member.create(memberData);
      createdMembers.push(memberData);
    } else {
      const isDiff =
        memberData.id !== existingMember.id ||
        memberData.namaLengkap !== existingMember.namaLengkap ||
        memberData.username !== existingMember.username ||
        false;

      if (isDiff) {
        await Member.update(memberData, { where: { id: memberData.id } });
        updatedMembers.push(memberData);
      }
    }
  }
  return { createdMembers, updatedMembers };
};

const deleteMembersNotInTrello = async (trelloIds) => {
  try {
    const dbIds = await Member.findAll({
      attributes: ["id"],
    });

    const idsToDelete = dbIds
      .map((member) => member.id)
      .filter((dbId) => !trelloIds.includes(dbId));

    if (idsToDelete.length > 0) {
      await Member.destroy({
        where: {
          id: idsToDelete,
        },
      });
      console.log({
        message: `Deleted member with id ${idsToDelete}!`,
      });
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error deleting members not in Trello!", error);
  }
};

const getTrelloMembers = async () => {
  try {
    const responseTrello = await fetch(
      `${BaseUrl}boards/${boardId}/members?key=${APIKey}&token=${APIToken}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (responseTrello.ok) {
      const data = await responseTrello.json();

      const { createdMembers, updatedMembers } = await processGetMembers(data);

      const trelloIds = data.map((member) => member.id);

      await deleteMembersNotInTrello(trelloIds);

      if (createdMembers.length > 0 || updatedMembers.length > 0) {
        console.log({
          message: "Get New Members Successfully!",
          createdMembers,
          updatedMembers,
        });
      } else {
        console.log({
          message: "No New and Updated Members!",
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

module.exports = { getTrelloMembers };

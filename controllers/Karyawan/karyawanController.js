const { Karyawan, Member } = require("../../models");
const { validationResult } = require("express-validator");
const {
  validateKaryawanData,
  isDataExist,
  validateKaryawanUpdate,
} = require("../../middlewares/validateKaryawan");
require("dotenv").config();
const APIKey = process.env.API_KEY;
const APIToken = process.env.API_TOKEN;
const BaseUrl = process.env.BASE_TRELLO_URL;
const boardId = process.env.BASE_BOARD_ID;
const sequelize = require("sequelize");
const op = sequelize.Op;

module.exports = {
  //get all dat karyawan
  async getAll(req, res) {
    try {
      const result = await Karyawan.findAll({
        attributes: [
          "karyawanId",
          "namaLengkap",
          "statusPernikahan",
          "nikKaryawan",
          "nomorIdentitas",
          "divisi",
          "tglBergabung",
          "statusKaryawan",
          "email",
          "nomorTelepon",
          "alamatKTP",
          "posisi",
          "resource",
          "penempatan",
          "telegramId",
          "createdBy",
          "createdDate",
          "pendidikanAkhir",
          "namaInstitusi",
          "tempatlahir",
          "tglLahir",
          "status",
          "roleTrello",
          "nikkaryawan",
          "jurusan",
          [sequelize.col("Member.username"), "trelloUsername"],
          "userRole",
          [
            sequelize.literal("TIMESTAMPDIFF( YEAR, tglBergabung, NOW() )"),
            "year",
          ],
          [
            sequelize.literal(
              "TIMESTAMPDIFF( MONTH, tglBergabung, NOW() ) % 12"
            ),
            "month",
          ],
          [
            sequelize.literal(
              "FLOOR( TIMESTAMPDIFF( DAY, tglBergabung, NOW() ) % 30.4375 )"
            ),
            "day",
          ],
        ],
        include: [
          {
            model: Member,
            attributes: [],
          },
        ],
        where: {
          status: "Active",
        },
      });
      res.status(200).json({
        message: "Get all Karyawan Successfully!",
        result,
      });
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).json({
        message: "Error executing query",
        error: error.message,
      });
    }
  },
  //tambah karyawan
  async addKaryawan(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const validationMessage = await validateKaryawanData(Karyawan, req.body);
      if (validationMessage) {
        return res.status(409).json({ error: validationMessage });
      }

      const desiredUsername = req.body.karyawanId;

      const responseTrello = await fetch(
        `${BaseUrl}boards/${boardId}/members/${desiredUsername}?type=normal&key=${APIKey}&token=${APIToken}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (responseTrello.ok) {
        const result = await Karyawan.create(req.body);

        const data = await responseTrello.json();

        let foundMember = null;

        for (const member of data.members) {
          if (member.username === desiredUsername) {
            foundMember = member;
            break;
          }
        }

        const trelloMember = await Member.create({
          id: foundMember.id,
          namaLengkap: req.body.namaLengkap,
          username: desiredUsername,
        });

        res.status(200).json({
          message: "Add karyawan and Trello Member Successfully!",
          result,
          trelloMember,
        });
      } else {
        return res.status(404).json({
          message: "Karyawan Id (username) not found on trello!",
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
  //get karyawan based on id
  async getKaryawan(req, res) {
    try {
      const { id } = req.params;

      const findMember = await Karyawan.findOne({
        attributes: ["namaLengkap"],
        where: {
          karyawanId: id,
        },
      });

      if (!findMember) {
        return res.status(404).json({ message: "Member not found!" });
      }

      const { namaLengkap } = findMember.dataValues;

      const karyawan = await Member.findOne({
        attributes: [
          [sequelize.col("Karyawan.karyawanId"), "karyawanId"],
          "namaLengkap",
          [sequelize.col("Karyawan.statusPernikahan"), "statusPernikahan"],
          [sequelize.col("Karyawan.nikKaryawan"), "nikKaryawan"],
          [sequelize.col("Karyawan.nomorIdentitas"), "nomorIdentitas"],
          [sequelize.col("Karyawan.divisi"), "divisi"],
          [sequelize.col("Karyawan.tglBergabung"), "tglBergabung"],
          [sequelize.col("Karyawan.statusKaryawan"), "statusKaryawan"],
          [sequelize.col("Karyawan.email"), "email"],
          [sequelize.col("Karyawan.nomorTelepon"), "nomorTelepon"],
          [sequelize.col("Karyawan.alamatKTP"), "alamatKTP"],
          [sequelize.col("Karyawan.posisi"), "posisi"],
          [sequelize.col("Karyawan.resource"), "resource"],
          [sequelize.col("Karyawan.penempatan"), "penempatan"],
          [sequelize.col("Karyawan.telegramId"), "telegramId"],
          [sequelize.col("Karyawan.createdBy"), "createdBy"],
          [sequelize.col("Karyawan.createdDate"), "createdDate"],
          [sequelize.col("Karyawan.pendidikanAkhir"), "pendidikanAkhir"],
          [sequelize.col("Karyawan.namaInstitusi"), "namaInstitusi"],
          [sequelize.col("Karyawan.tempatLahir"), "tempatLahir"],
          [sequelize.col("Karyawan.status"), "status"],
          [sequelize.col("Karyawan.roleTrello"), "roleTrello"],
          [sequelize.col("Karyawan.jurusan"), "jurusan"],
          [sequelize.col("Karyawan.createdBy"), "createdBy"],
          "username",
          [sequelize.col("Karyawan.userRole"), "userRole"],
        ],
        include: [
          {
            model: Karyawan,
            attributes: [],
          },
        ],
        where: { namaLengkap },
      });

      if (!karyawan) {
        return res.status(404).json({ message: "Karyawan not found!" });
      }

      res.status(200).json({
        message: "Get karyawan Successfully!",
        karyawan,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  },
  //update karyawan
  async updateKaryawan(req, res) {
    try {
      const { karyawanId } = req.params;

      const karyawan = await Karyawan.findOne({ where: { karyawanId } });
      if (!karyawan) {
        return res.status(404).json({ message: "Karyawan not found!" });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const validationMessage = await validateKaryawanData(Karyawan, req.body);

      if (
        validationMessage &&
        !(await isDataExist(Karyawan, "karyawanId", karyawanId))
      ) {
        return res.status(409).json({ error: validationMessage });
      }

      const [updatedRows] = await Karyawan.update(req.body, {
        where: { karyawanId },
      });

      if (updatedRows === 0) {
        return res.status(200).json({ error: "Nothing to update!" });
      }

      res.status(201).json({
        message: "Update karyawan successfully!",
      });
    } catch (err) {
      console.error(err);
      const validationMessage = await validateKaryawanUpdate(
        Karyawan,
        req.body
      );
      res.status(500).json({ error: validationMessage });
    }
  },
  //delete karyawan, only admin
  async deleteKaryawaan(req, res) {
    try {
      const { id } = req.params;

      const karyawan = await Karyawan.findOne({ where: { karyawanId: id } });
      if (!karyawan) {
        return res.status(404).json({ message: "Karyawan not found!" });
      }

      const responseTrello = await fetch(
        `${BaseUrl}boards/${boardId}/members/${id}?key=${APIKey}&token=${APIToken}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const result = await Karyawan.destroy({ where: { karyawanId: id } });

      if (responseTrello.ok) {
        const data = await responseTrello.json();

        res.status(201).json({
          statusCode: res.statusCode,
          message: "Karyawan has been deleted!",
          trello: data,
        });
      } else {
        return res.status(201).json({
          statusCode: res.statusCode,
          message: "Karyawan has been deleted!",
          trello: "failed to remove employee on trello",
        });
      }
    } catch (error) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
};

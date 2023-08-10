const { AssignmentKaryawan, Board, Karyawan } = require("../../models");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("sequelize");
const { validationResult } = require("express-validator");

module.exports = {
  async reportAssignment(req, res) {
    try {
      const result = await AssignmentKaryawan.findAll({
        attributes: [
          "assignmentId",
          "karyawanId",
          [sequelize.col("Karyawan.namaLengkap"), "namaLengkap"],
          "boardId",
          [sequelize.col("Board.name"), "boardName"],
          "pm",
          "assignmentType",
          "assignmentDate",
          "assignmentEnd",
          "assignmentExtend",
          "status",
          "createdBy",
          "timeNow",
          "crName",
        ],
        include: [
          {
            model: Karyawan,
            attributes: [],
          },
          {
            model: Board,
            attributes: [],
          },
        ],
      });

      res.status(200).json({
        message: "Get Report Assignment Successfully!",
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
  async addAssignment(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const {
        karyawanId,
        boardId,
        pm,
        assignmentType,
        crName,
        assignmentDate,
        assignmentEnd,
      } = req.body;
      const createdBy = req.user.email;
      const assignmentId = uuidv4();

      const board = await Board.findOne({
        where: { boardId },
      });

      const karyawan = await Karyawan.findOne({
        where: { karyawanId },
      });

      if (!karyawan) {
        return res.status(404).json({
          message: `Karyawan not found!`,
        });
      } else if (!board) {
        return res.status(404).json({
          message: `Board not found!`,
        });
      }

      const result = await AssignmentKaryawan.create({
        assignmentId,
        karyawanId,
        boardId,
        pm,
        assignmentType,
        crName,
        assignmentDate,
        assignmentEnd,
        createdBy,
      });

      res.status(200).json({
        message: "Get Report Assignment Successfully!",
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
  async getAssignment(req, res) {
    try {
      const { assignmentId } = req.params;

      const assignment = await AssignmentKaryawan.findOne({
        where: { assignmentId },
      });

      if (!assignment) {
        return res.status(404).json({
          message: `Assignment not found!`,
        });
      }

      const result = await AssignmentKaryawan.findOne({
        attributes: [
          "crName",
          "assignmentId",
          "karyawanId",
          [sequelize.col("Karyawan.namaLengkap"), "namaLengkap"],
          [sequelize.col("Board.name"), "boardName"],
          "pm",
          "assignmentType",
          "status",
          "assignmentExtend",
          "assignmentDate",
          "assignmentEnd",
        ],
        include: [
          {
            model: Karyawan,
            attributes: [],
          },
          {
            model: Board,
            attributes: [],
          },
        ],
        where: { assignmentId },
      });

      res.status(200).json({
        message: "Get Detail Assignment Successfully!",
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
  async updateAssignment(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const { assignmentId } = req.params;

      const assignment = await AssignmentKaryawan.findOne({
        where: { assignmentId },
      });

      if (!assignment) {
        return res.status(404).json({
          message: `Assignment not found!`,
        });
      }

      const data = {
        status: req.body.status,
        assignmentDate: req.body.assignmentDate,
        assignmentEnd: req.body.assignmentEnd,
        assignmentType: req.body.assignmentType,
        assignmentExtend: req.body.assignmentExtend,
        crName: req.body.crName,
      };
      //   const createdBy = req.user.email;
      const [result] = await AssignmentKaryawan.update(data, {
        where: { assignmentId },
      });

      if (result === 0) {
        return res.status(200).json({ message: "Nothing to update!" });
      }

      const updated = await AssignmentKaryawan.findOne({
        where: { assignmentId },
      });

      res.status(200).json({
        message: "Update Assignment Successfully!",
        updated,
      });
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).json({
        message: "Error executing query",
        error: error.message,
      });
    }
  },
  async deleteAssignment(req, res) {
    try {
      const { assignmentId } = req.params;

      const assignment = await AssignmentKaryawan.findOne({
        where: { assignmentId },
      });

      if (!assignment) {
        return res.status(404).json({
          message: `Assignment not found!`,
        });
      }

      await AssignmentKaryawan.destroy({ where: { assignmentId } });

      res.status(200).json({
        message: "Delete Assignment Successfully!",
      });
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).json({
        message: "Error executing query",
        error: error.message,
      });
    }
  },
};

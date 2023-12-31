const { Karyawan, Skill } = require("../../models");
const sequelize = require("sequelize");

module.exports = {
  //get all karyawan skills
  async getAllKaryawanSkill(req, res) {
    try {
      const result = await Skill.findAll({
        attributes: [
          "namaLengkap",
          "skill",
          "createdBy",
          "timeNow",
          [sequelize.col("Karyawan.karyawanId"), "karyawanId"],
        ],
        include: [
          {
            model: Karyawan,
            attributes: [],
          },
        ],
      });

      res.status(200).json({
        message: "Get Karyawan Skills Successfully!",
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

  async getKaryawanSkill(req, res) {
    try {
      const { namaLengkap } = req.params;

      const karyawan = await Karyawan.findOne({
        where: { namaLengkap },
      });

      const hadSkill = await Skill.findOne({
        where: { namaLengkap },
      });

      if (!karyawan) {
        return res.status(404).json({
          message: `Karyawan with name ${namaLengkap} not found!`,
        });
      } else if (!hadSkill) {
        return res.status(404).json({
          message: `Karyawan ${namaLengkap} not have skill data!`,
        });
      }

      const result = await Skill.findAll({
        attributes: [
          "namaLengkap",
          "skill",
          "createdBy",
          "timeNow",
          [sequelize.col("Karyawan.karyawanId"), "karyawanId"],
        ],
        include: [
          {
            model: Karyawan,
            attributes: [],
          },
        ],
        where: {
          namaLengkap,
        },
      });

      res.status(200).json({
        message: "Get Skill Karyawan Successfully!",
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
  async addKaryawanSkill(req, res) {
    try {
      const { namaLengkap, skill } = req.body;
      const createdBy = req.user.email;

      const hadSkill = await Skill.findOne({
        where: { namaLengkap },
      });

      const karyawan = await Karyawan.findOne({
        where: { namaLengkap },
      });

      if (!karyawan) {
        return res.status(404).json({
          message: `Karyawan not found!`,
        });
      } else if (hadSkill) {
        return res.status(404).json({
          message: `Karyawan ${namaLengkap} already have skill data!`,
        });
      }

      const result = await Skill.create({ namaLengkap, skill, createdBy });

      res.status(200).json({
        message: "Add Skill Karyawan Successfully!",
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
  async updateSkillKaryawan(req, res) {
    try {
      const { namaLengkap } = req.params;
      const { skill } = req.body;

      const karyawan = await Karyawan.findOne({
        where: { namaLengkap },
      });

      const hadSkill = await Skill.findOne({
        where: { namaLengkap },
      });

      if (!karyawan) {
        return res.status(404).json({
          message: `Karyawan with name ${namaLengkap} not found!`,
        });
      } else if (!hadSkill) {
        return res.status(404).json({
          message: `Karyawan ${namaLengkap} not have skill data!`,
        });
      }

      const [result] = await Skill.update(
        { skill },
        { where: { namaLengkap } }
      );

      if (result === 0) {
        return res.status(200).json({ message: "Nothing to update!" });
      }

      const updated = await Skill.findOne({ where: { namaLengkap } });

      res.status(200).json({
        message: "Update Skill Karyawan Successfully!",
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
};

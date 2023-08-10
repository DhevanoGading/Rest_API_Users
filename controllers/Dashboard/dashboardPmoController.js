const { Op } = require("sequelize");
const db = require("../../models");
const Karyawan = db.Karyawan;
const AssignmentKaryawan = db.AssignmentKaryawan;
const Client = db.Client;
const ProjectSetting = db.ProjectSetting;

module.exports = {
  async dasboardSummary(req, res) {
    try {
      const pmo = await Karyawan.count({
        where: {
          divisi: "PMO",
          namaLengkap: {
            [Op.not]: "Admin Trello",
          },
          status: {
            [Op.substring]: "ACTIVE",
          },
          posisi: {
            [Op.not]: "Quality Control",
          },
          resource: "PMO",
        },
      });

      const sdo = await Karyawan.count({
        where: {
          divisi: "SDO",
          status: {
            [Op.substring]: "ACTIVE",
          },
          posisi: {
            [Op.not]: "Quality Control",
          },
          resource: "SDO",
        },
      });

      const qc = await Karyawan.count({
        where: {
          divisi: "Quality Control",
          status: {
            [Op.substring]: "ACTIVE",
          },
          resource: {
            [Op.not]: "RMO",
          },
        },
      });

      const rmo = await Karyawan.count({
        where: {
          status: {
            [Op.substring]: "ACTIVE",
          },
          resource: "RMO",
        },
      });

      res.status(200).json({
        message: "Get Dasboard Summary Successfully!",
        pmo,
        sdo,
        qc,
        rmo,
      });
    } catch (error) {
      console.error("Error executing query:", error);
      res.status(500).json({
        message: "Error executing query",
        error: error.message,
      });
    }
  },
  async dasboardPmoPosisi(req, res) {
    try {
      const result = await Karyawan.findAll({
        attributes: [
          "posisi",
          [db.sequelize.fn("COUNT", db.sequelize.col("posisi")), "jumlah"],
        ],
        where: {
          divisi: "PMO",
          resource: "PMO",
          status: {
            [Op.substring]: "ACTIVE",
          },
          posisi: {
            [Op.not]: "Quality Control",
          },
        },
        group: ["posisi"],
      });

      res.status(200).json({
        message: "Get Dasboard Summary Successfully!",
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
  async dasboardPmoStatus(req, res) {
    try {
      const result = await Karyawan.findAll({
        attributes: [
          [
            db.sequelize.literal(`CASE
                    WHEN posisi = 'Developer' THEN 'Dev'
                    WHEN posisi = 'Developer Analyst' THEN 'Dev An'
                    WHEN posisi = 'Project Admin' THEN 'PA'
                    WHEN posisi = 'Project Manager' THEN 'PM'
                    WHEN posisi = 'System Administrator' THEN 'Sys Admin'
                    WHEN posisi = 'System Analyst' THEN 'SA'
                    WHEN posisi = 'Technical Writer' THEN 'TW'
                    ELSE 'Other'
                END`),
            "posisi",
          ],
          [
            db.sequelize.fn(
              "COUNT",
              db.sequelize.literal(`CASE
                        WHEN upper(statusKaryawan) = 'FIXED-TERM CONTRACTS' THEN 1
                        ELSE NULL
                    END`)
            ),
            "kontrak",
          ],
          [
            db.sequelize.fn(
              "COUNT",
              db.sequelize.literal(`CASE
                        WHEN upper(statusKaryawan) = 'PERMANENT' THEN 1
                        ELSE NULL
                    END`)
            ),
            "tetap",
          ],
        ],
        where: {
          divisi: "PMO",
          resource: "PMO",
          status: {
            [Op.substring]: "ACTIVE",
          },
          posisi: {
            [Op.not]: "Quality Control",
          },
        },
        group: [db.sequelize.literal("posisi")],
      });

      res.status(200).json({
        message: "Get Dasboard Summary Successfully!",
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
  async dashboardPmoSharing(req, res) {
    try {
      const result = await Karyawan.findAll({
        attributes: [
          [
            db.sequelize.literal(`CASE
                        WHEN posisi = 'Developer' THEN 'Dev'
                        WHEN posisi = 'Developer Analyst' THEN 'Dev An'
                        WHEN posisi = 'Project Admin' THEN 'PA'
                        WHEN posisi = 'Project Manager' THEN 'PM'
                        WHEN posisi = 'System Administrator' THEN 'Sys Admin'
                        WHEN posisi = 'System Analyst' THEN 'SA'
                        WHEN posisi = 'Technical Writer' THEN 'TW'
                        ELSE 'Other'
                    END`),
            "posisi",
          ],
          [
            db.sequelize.fn(
              "COUNT",
              db.sequelize.literal(`CASE WHEN jumlah = 1 THEN 1 END`)
            ),
            "satu",
          ],
          [
            db.sequelize.fn(
              "COUNT",
              db.sequelize.literal(`CASE WHEN jumlah = 2 THEN 1 END`)
            ),
            "double",
          ],
          [
            db.sequelize.fn(
              "COUNT",
              db.sequelize.literal(`CASE WHEN jumlah > 2 THEN 1 END`)
            ),
            "morethan",
          ],
        ],
        include: [
          {
            model: AssignmentKaryawan,
            attributes: [],
            where: {
              [Op.substring]: "ACTIVE",
            },
            required: true,
          },
          {
            model,
          },
        ],
      });

      res.status(200).json({
        message: "Get Dasboard Summary Successfully!",
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
};

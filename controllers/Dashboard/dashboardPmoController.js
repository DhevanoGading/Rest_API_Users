const { Op, QueryTypes } = require("sequelize");
const db = require("../../models");
const Karyawan = db.Karyawan;
const {
  AssignmentKaryawan,
  Client,
  ProjectSetting,
  Board,
} = require("../../models");

queryResourceFromTo = async (from, to) => {
  let query = `
        SELECT
            k.karyawanId,
            MAX(k.namaLengkap) AS namaLengkap,
            MAX(SUBSTRING(b.name, 1, 25)) AS name,
            MAX(k.posisi) AS posisi,
            MAX(clientId) AS clientId,
            MAX(SUBSTRING(nama, 1, 25)) AS nama,
            MAX(projectDiv) AS projectDiv,
            COUNT(1) AS jumlah
        FROM (
            SELECT
                XY.boardId,
                XY.karyawanId,
                ps.clientId,
                c.nama,
                ps.projectDiv
            FROM (
                SELECT DISTINCT
                    boardId,
                    karyawanId
                FROM AssignmentKaryawans
                WHERE UPPER(status) = 'ACTIVE'
            ) XY,
            ProjectSettings ps,
            Clients c
            WHERE ps.boardId = XY.boardId
                AND ps.projectDiv = '${to}'
                AND c.clientId = ps.clientId
                AND UPPER(ps.status) = 'ACTIVE'
        ) MMM,
        Karyawans k,
        Boards b
        WHERE k.karyawanId = MMM.karyawanId
            AND b.boardId = MMM.boardId
            AND k.posisi != 'Quality Control'
            AND k.divisi = '${from}'
            AND k.resource = '${from}'
            AND UPPER(k.status) = 'ACTIVE'
        GROUP BY k.karyawanId;`;
  return query;
};

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
        message: "Get Dasboard PMO Posisi Successfully!",
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
        message: "Get Dasboard PMO Status Successfully!",
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
      const result = await db.sequelize.query(
        `SELECT
            CASE
              WHEN posisi = 'Developer' THEN 'Dev'
              WHEN posisi = 'Developer Analyst' THEN 'Dev An'
              WHEN posisi = 'Project Admin' THEN 'PA'
              WHEN posisi = 'Project Manager' THEN 'PM'
              WHEN posisi = 'System Administrator' THEN 'Sys Admin'
              WHEN posisi = 'System Analyst' THEN 'SA'
              WHEN posisi = 'Technical Writer' THEN 'TW'
              ELSE 'Other'
            END AS 'posisi',
            COUNT(CASE WHEN jumlah = 1 THEN 1 END) AS 'satu',
            COUNT(CASE WHEN jumlah = 2 THEN 1 END) AS 'double',
            COUNT(CASE WHEN jumlah > 2 THEN 1 END) AS 'morethan'
          FROM (
            SELECT *
            FROM (
              SELECT k.karyawanId, k.posisi, COUNT(1) jumlah
              FROM (
                SELECT XY.boardId, XY.karyawanId, ps.clientId, c.nama
                FROM (
                  SELECT DISTINCT boardId, karyawanId
                  FROM AssignmentKaryawans
                  WHERE UPPER(status) = 'ACTIVE'
                ) XY, ProjectSettings ps, Clients c
                WHERE ps.boardId = XY.boardId
                  AND c.clientId = ps.clientId
              ) MMM, Karyawans k
              WHERE k.karyawanId = MMM.karyawanId
                AND k.namaLengkap != 'Admin Trello'
                AND k.posisi != 'Quality Control'
                AND k.divisi = 'PMO'
                AND k.resource = 'PMO'
                AND UPPER(k.status) = 'ACTIVE'
              GROUP BY karyawanId
            ) NNN
          ) XXXX
          GROUP BY posisi
          ORDER BY posisi ASC;`,
        {
          type: QueryTypes.SELECT,
        }
      );

      res.status(200).json({
        message: "Get Dasboard PMO Sharing Successfully!",
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
  async dashboardSdoDiPmo(req, res) {
    try {
      const result = await db.sequelize.query(
        await queryResourceFromTo("SDO", "PMO"),
        {
          type: QueryTypes.SELECT,
        }
      );

      res.status(200).json({
        message: "Get Dasboard SDO di PMO Successfully!",
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
  async dasboardPmoForSdo(req, res) {
    try {
      const result = await db.sequelize.query(
        await queryResourceFromTo("PMO", "SDO"),
        {
          type: QueryTypes.SELECT,
        }
      );

      res.status(200).json({
        message: "Get Dasboard PMO di SDO Successfully!",
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
  async dashboardPmoSdoOther(req, res) {
    try {
      const result = await db.sequelize.query(
        `
        select 'PMO' divisi, count(1) resource from (  
          select distinct namaLengkap from (  
            select distinct b.boardId, b.username,k.namaLengkap, posisi, divisi, k.status from Boardactions b, Karyawans k , TrelloKaryawans tk 
            where b.username = tk.username  
            and k.namaLengkap = tk.namaLengkap 
            and substring(CONVERT_TZ(b.tanggal,'+00:00','+07:00'),1,10) between substring(CURDATE() - INTERVAL 1 MONTH,1,10) AND substring(CURDATE(),1,10) 
            and boardId in ( 
              select ps.boardId from ProjectSettings ps, Boards b, Clients c 
                where upper(status) = 'Active' 
                and ps.boardId = b.boardId 
                and ProjectType ='Project' 
                and projectDiv = 'PMO' 
                and c.clientId = ps.clientId
            ) 
            and k.divisi = 'PMO' 
            and k.resource = 'PMO'
          ) Z, ProjectSettings p, Clients c  
          where posisi != 'Quality Control'  
          and divisi = 'PMO'  
          and upper(Z.status) = 'ACTIVE' 
          and p.clientId = c.clientId  
          and Z.boardId = p.boardId  
          order by namaLengkap asc
        ) S
        UNION 
        select 'SDO' divisi, count(1) resource from ( 
          select distinct k.karyawanId, k.divisi from ( 
            select XY.boardId, XY.karyawanId, ps.clientId,c.nama, ps.projectDiv from ( 
              select distinct boardId, karyawanId from AssignmentKaryawans ak where upper(status) = 'ACTIVE'
            ) XY, ProjectSettings ps, Clients c 
            where ps.boardId = XY.boardId
            and ps.projectDiv = 'PMO' 
            and c.clientId = ps.clientId
            and upper(ps.status) = 'ACTIVE'
          ) MMM, Karyawans k, Boards b 
          where k.karyawanId = MMM.karyawanId 
          and b.boardId = MMM.boardId
          and k.divisi = 'SDO' 
          and k.posisi != 'Quality Control' 
          and upper(k.status) = 'ACTIVE' 
        )XY group by divisi
        UNION 
        Select 'PMO-OTHER' divisi, count(1) resource  from ( 
          select namaLengkap, posisi, divisi, status from Karyawans where namaLengkap not in ( 
            select distinct namaLengkap from ( 
              select distinct b.boardId, b.username,k.namaLengkap, posisi, divisi, k.status from Boardactions b, Karyawans k , TrelloKaryawans tk 
              where b.username = tk.username  
              and k.namaLengkap = tk.namaLengkap 
              and substring(CONVERT_TZ(b.tanggal,'+00:00','+07:00'),1,10) between substring(CURDATE() - INTERVAL 1 MONTH,1,10) AND substring(CURDATE(),1,10) 
              and boardId in ( 
                select ps.boardId  from ProjectSettings ps, Boards b, Clients c 
                where upper(status) = 'Active' 
                and ps.boardId = b.boardId 
                and ProjectType ='Project' 
                and projectDiv = 'PMO' 
                and c.clientId = ps.clientId
              )
            ) Z, ProjectSettings p, Clients c 
            where posisi != 'Quality Control' 
            and divisi = 'PMO' 
            and upper(Z.status) = 'ACTIVE' 
            and p.clientId = c.clientId
            and Z.boardId = p.boardId
            order by namaLengkap asc
          ) 
          and posisi != 'Quality Control' 
          and divisi = 'PMO' 
          and resource = 'PMO' 
          and upper(status) = 'ACTIVE'
        ) XX
        UNION 
        select 'RMO' divisi, count(1) resource from (  
          select distinct namaLengkap from (  
            select distinct b.boardId, b.username,k.namaLengkap, posisi, divisi, k.status from Boardactions b, Karyawans k , TrelloKaryawans tk 
            where b.username = tk.username  
            and k.namaLengkap = tk.namaLengkap 
            and substring(CONVERT_TZ(b.tanggal,'+00:00','+07:00'),1,10) between substring(CURDATE() - INTERVAL 1 MONTH,1,10) AND substring(CURDATE(),1,10) 
            and boardId in ( 
              select ps.boardId  from ProjectSettings ps, Boards b, Clients c 
              where upper(status) = 'Active' 
              and ps.boardId = b.boardId 
              and ProjectType ='Project' 
              and projectDiv = 'PMO' 
              and c.clientId = ps.clientId
            ) 
            and k.divisi = 'PMO' 
            and k.resource = 'RMO' 
          ) Z, ProjectSettings p, Clients c  
          where posisi != 'Quality Control'  
          and divisi = 'PMO'  
          and upper(Z.status) = 'ACTIVE' 
          and p.clientId = c.clientId  
          and Z.boardId = p.boardId 
          order by namaLengkap asc
        ) S ;
        `,
        {
          type: QueryTypes.SELECT,
        }
      );
      res.status(200).json({
        message: "Get Dasboard PMO, SDO, and Other Successfully!",
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
  async dasboardPmoChart(req, res) {
    try {
      const result = await db.sequelize.query(
        `
        select Clients, resource from ( 
          select nama Clients, count(1) resource from ( 
            select distinct namaLengkap, nama from ( 
              select distinct b.boardId, b.username,k.namaLengkap, posisi, divisi, k.status from Boardactions b, Karyawans k , TrelloKaryawans tk 
              where b.username = tk.username  
              and k.namaLengkap = tk.namaLengkap  
              and k.resource = 'PMO' 
              and substring(CONVERT_TZ(b.tanggal,'+00:00','+07:00'),1,10) between substring(CURDATE() - INTERVAL 1 MONTH,1,10) AND substring(CURDATE(),1,10) 
              and boardId in ( 
                select ps.boardId  from ProjectSettings ps, Boards b, Clients c 
                where upper(status) = 'Active' 
                and ps.boardId = b.boardId 
                and projectType ='Project' 
                and projectDiv != 'SDO' 
                and c.clientId = ps.clientId
              ) 
            ) Z, ProjectSettings p, Clients c 
            where posisi != 'Quality Control' 
            and divisi = 'PMO' 
            and upper(Z.status) = 'ACTIVE' 
            and p.clientId = c.clientId 
            and Z.boardId = p.boardId
          ) CC 
          group by nama 
        ) BB
        UNION  
        Select 'Others', count(1) resource  from ( 
          select namaLengkap, posisi, divisi, status from Karyawans where namaLengkap not in ( 
            select distinct namaLengkap from ( 
              select distinct b.boardId, b.username,k.namaLengkap, posisi, divisi, k.status from Boardactions b, Karyawans k , TrelloKaryawans tk 
              where b.username = tk.username 
              and k.namaLengkap = tk.namaLengkap 
              and substring(CONVERT_TZ(b.tanggal,'+00:00','+07:00'),1,10) between substring(CURDATE() - INTERVAL 1 MONTH,1,10) AND substring(CURDATE(),1,10) 
              and boardId in ( 
                select ps.boardId  from ProjectSettings ps, Boards b, Clients c 
                where upper(status) = 'Active' 
                and ps.boardId = b.boardId 
                and projectType ='Project' 
                and projectDiv != 'SDO' 
                and c.clientId = ps.clientId
              ) 
            ) Z, ProjectSettings p, Clients c 
            where posisi != 'Quality Control' 
            and divisi = 'PMO' 
            and upper(Z.status) = 'ACTIVE' 
            and p.clientId = c.clientId  
            and Z.boardId = p.boardId
            order by namaLengkap asc
          ) 
          and posisi != 'Quality Control' 
          and divisi = 'PMO' 
          and resource = 'PMO' 
          and upper(status) = 'ACTIVE'
        ) XX;
        `,
        {
          type: QueryTypes.SELECT,
        }
      );
      res.status(200).json({
        message: "Get Dasboard PMO Chart Successfully!",
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
  async dashboardPmoPercent(req, res) {
    try {
      const result = await db.sequelize.query(
        `
        select * from (
          select nama Clients, 
          COUNT(CASE WHEN resource = 'PMO' THEN 1 END) AS 'pmo', 
          COUNT(CASE WHEN resource = 'RMO' THEN 1 END) AS 'rmo' 
          from (  
            select distinct namaLengkap, nama,resource  from (  
              select distinct b.boardId, b.username,k.namaLengkap, posisi, k.resource, divisi, k.status from Boardactions b, Karyawans k , TrelloKaryawans tk 
              where b.username = tk.username  
              and k.namaLengkap = tk.namaLengkap 
              and substring(CONVERT_TZ(b.tanggal,'+00:00','+07:00'),1,10) between substring(CURDATE() - INTERVAL 1 MONTH,1,10) AND substring(CURDATE(),1,10) 
              and boardId in (  
                select ps.boardId  from ProjectSettings ps, Boards b, Clients c 
                where upper(status) = 'ACTIVE' 
                and ps.boardId = b.boardId 
                and ProjectType ='Project' 
                and projectDiv != 'SDO' 
                and c.clientId = ps.clientId
              ) 
            ) Z, ProjectSettings p, Clients c 
            where posisi != 'Quality Control' 
            and divisi = 'PMO' 
            and Z.namaLengkap != 'Admin Trello' 
            and upper(Z.status) = 'ACTIVE' 
            and p.clientId = c.clientId  
            and Z.boardId = p.boardId 
          ) CC 
          group by nama 
          UNION 
          Select 'Others', 
          COUNT(CASE WHEN resource = 'PMO' THEN 1 END) AS 'pmo', 
          COUNT(CASE WHEN resource = 'RMO' THEN 1 END) AS 'rmo' 
          from ( 
            select namaLengkap, posisi, divisi, resource from Karyawans where namaLengkap not in ( 
              select distinct namaLengkap from ( 
                select distinct b.boardId, b.username,k.namaLengkap, posisi, divisi, k.status from Boardactions b, Karyawans k , TrelloKaryawans tk 
                where b.username = tk.username 
                and k.namaLengkap = tk.namaLengkap 
                and substring(CONVERT_TZ(b.tanggal,'+00:00','+07:00'),1,10) between substring(CURDATE() - INTERVAL 1 MONTH,1,10) AND substring(CURDATE(),1,10) 
                and boardId in ( 
                  select ps.boardId  from ProjectSettings ps, Boards b, Clients c 
                  where upper(status) = 'ACTIVE' 
                  and ps.boardId = b.boardId 
                  and ProjectType ='Project' 
                  and projectDiv != 'SDO' 
                  and c.clientId = ps.clientId
                ) 
              ) Z, ProjectSettings p, Clients c 
              where posisi != 'Quality Control' 
              and divisi = 'PMO' 
              and Z.namaLengkap != 'Admin Trello' 
              and upper(Z.status) = 'ACTIVE' 
              and p.clientId = c.clientId 
              and Z.boardId = p.boardId
              order by namaLengkap asc
            ) 
            and posisi != 'Quality Control' 
            and divisi = 'PMO' 
            and namaLengkap != 'Admin Trello' 
            and upper(status) = 'ACTIVE'
          ) XX
        ) ZZ;
        `,
        {
          type: QueryTypes.SELECT,
        }
      );
      res.status(200).json({
        message: "Get Dasboard PMO Percent Successfully!",
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

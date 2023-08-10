const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./models");
const cron = require("node-cron");

const { getTrelloActions } = require("./utils/trelloActions");
const { getTrelloBoard } = require("./utils/trelloBoard");
const { getTrelloCards } = require("./utils/trelloCards");
const { getTrelloLists } = require("./utils/trelloLists");
const { getTrelloMembers } = require("./utils/trelloMembers");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const karyawanRouter = require("./routes/karyawanRoutes");
const dashboardPmoRouter = require("./routes/dashboardPmoRoutes");

require("dotenv").config();
const PORT = process.env.APP_PORT || 3000;

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const option = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node JS API Karyawan with MySQL",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: [
    "./routes/authRoutes.js",
    "./routes/userRoutes.js",
    "./routes/karyawanRoutes.js",
  ],
};

const swaggerSpec = swaggerJSDoc(option);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/karyawan", karyawanRouter);
app.use("/dashboard-pmo", dashboardPmoRouter);

// getTrelloActions();
// getTrelloBoard();
// getTrelloCards();
// getTrelloLists();
// getTrelloMembers();

// const functions = [
//   getTrelloActions,
//   getTrelloBoard,
//   getTrelloCards,
//   getTrelloLists,
//   getTrelloMembers,
// ];

// function delay(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// async function runFunctions() {
//   for (let i = 0; i < functions.length; i++) {
//     await functions[i]();
//     await delay(60000); // Delay of 1 minute
//   }
//   runFunctions(); // Loop back to the beginning
// }

// runFunctions();

db.sequelize.sync().then((req) => {
  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
});

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./models");
const cron = require("node-cron");

const { getTrelloActions } = require("./utils/getTrelloActions");
const authRouter = require("./routes/authentication");
const userRouter = require("./routes/user");
const karyawanRouter = require("./routes/karyawan");

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
      title: "Node JS API User with MySQL",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: [
    "./routes/authentication.js",
    "./routes/user.js",
    "./routes/karyawan.js",
  ],
};

const swaggerSpec = swaggerJSDoc(option);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", authRouter);
app.use("/user", userRouter);
app.use("/karyawan", karyawanRouter);

cron.schedule("*/1 * * * *", getTrelloActions);

db.sequelize.sync().then((req) => {
  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
});

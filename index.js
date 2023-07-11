const express = require("express");
const app = express();
const db = require("./models");
const { User } = require("./models");
const bcrypt = require("bcrypt");

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const cookieParser = require("cookie-parser");
const { generateTokens, validateToken } = require("./jwt");

app.use(express.json());
app.use(cookieParser());

const option = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node JS API User with MySQL",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./index.js"],
};

const swaggerSpec = swaggerJSDoc(option);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password
 *       additionalProperties: false
 */

/**
 * @swagger
 * /register/admin:
 *  post:
 *    summary: Register admin
 *    description: This api is used to admin register
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Auth'
 *    responses:
 *      200:
 *        description: Register successfully
 */

//register admin
app.post("/register/admin", (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      email: email,
      password: hash,
      role: "admin",
    })
      .then((result) => {
        res.json({
          data: result,
          message: "User Registered!",
        });
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({ error: err });
        }
      });
  });
});

/**
 * @swagger
 * /register:
 *  post:
 *    summary: Register user
 *    description: This api is used to user register
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Auth'
 *    responses:
 *      200:
 *        description: Register successfully
 */

//register user
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      email: email,
      password: hash,
      role: "user",
    })
      .then((result) => {
        res.json({
          data: result,
          message: "User Registered!",
        });
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({ error: err });
        }
      });
  });
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     description: This API is used for user login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: Login successfully
 */

//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    res.status(400).json({ error: "User Doesn't Exist!" });
  } else {
    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
      if (!match) {
        res.status(400).json({ error: "Invalid password!" });
      } else {
        const accessToken = generateTokens(user);
        res.cookie("access-token", accessToken, {
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({
          message: "Logged in Succesfully!",
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
          },
        });
      }
    });
  }
});

/**
 * @swagger
 * /logout:
 *  post:
 *    summary: Logout user
 *    description: This api is used to clear cookie
 *    responses:
 *      200:
 *        description: Logout Succesfully!
 */

//logout
app.post("/logout", validateToken(), (req, res) => {
  // Hapus cookie 'access-token'
  res.clearCookie("access-token");
  res.json({ message: "Logged out successfully" });
});

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          email:
 *            type: string
 *          password:
 *            type: string
 *          role:
 *            type: string
 *            enum:
 *              - admin
 *              - user
 */

/**
 * @swagger
 * /user:
 *  get:
 *    summary: Get all data users
 *    description: This api is used to get all data users
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/User'
 */

//get all user
app.get("/user", validateToken("admin"), (req, res) => {
  User.findAll()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

/**
 * @swagger
 * /profile/{id}:
 *  get:
 *    summary: Get data users
 *    description: This api is used to get data user
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID required
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#components/schemas/User'
 */

//get user
app.get("/profile/:id", validateToken("user"), (req, res) => {
  const { id } = req.params;
  const tokenUserId = req.user.id;

  // Memeriksa apakah ID pengguna dalam token sama dengan ID pengguna dalam URL
  if (parseInt(id) !== tokenUserId) {
    return res.status(403).json({ error: "Access denied!" });
  }
  User.findOne({ where: { id: id } })
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

db.sequelize.sync().then((req) => {
  app.listen(3000, () => {
    console.log(`Server listening at http://localhost:3000`);
  });
});

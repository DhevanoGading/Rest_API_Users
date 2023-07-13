const { User } = require("../models");
const bcrypt = require("bcrypt");
const { generateTokens } = require("../auth");

module.exports = {
  //register untuk admin
  async registerAdmin(req, res) {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      email: email,
      password: hash,
      role: "admin",
    })
      .then((result) => {
        res.json({
          data: {
            id: result.id,
            email: result.email,
            role: result.role,
          },
          message: "Admin Registered!",
        });
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({ error: err });
        }
      });
  },
  //register untuk user
  async registerUser(req, res) {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      email: email,
      password: hash,
      role: "user",
    })
      .then((result) => {
        res.json({
          data: {
            id: result.id,
            email: result.email,
            role: result.role,
          },
          message: "User Registered!",
        });
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({ error: err });
        }
      });
  },
  //login untuk user dan admin
  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      res.status(400).json({ error: "User Doesn't Exist!" });
    } else {
      const dbPassword = user.password;
      console.log();
      const match = await bcrypt.compare(password, dbPassword);

      if (!match) {
        res.status(400).json({ error: "Invalid password!" });
      } else {
        const accessToken = generateTokens(user);
        res.cookie("access_token", accessToken, {
          maxAge: 24 * 60 * 60 * 1000,
          httpOnly: true,
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
    }
  },
  logout(req, res) {
    // Hapus cookie 'access_token'
    res.clearCookie("access_token");
    res.json({ message: "Logged out successfully" });
  },
  //get all data user
  async getAll(req, res) {
    await User.findAll()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  //get user profile based on role and id
  async getUser(req, res) {
    const { id } = req.params;
    const tokenUserId = req.user.id;
    console.log(req.user);

    // Memeriksa apakah ID pengguna dalam token sama dengan ID pengguna dalam URL
    if (parseInt(id) !== tokenUserId) {
      return res.status(403).json({ error: "Access denied!" });
    }
    await User.findOne({ where: { id: id } })
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
  },
  //delete user, only admin
  async deleteUser(req, res) {
    const { id } = req.params;

    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      return res.json({ message: "User not found!" });
    }

    await User.destroy({ where: { id: id } })
      .then((result) => {
        res.json({
          statusCode: res.statusCode,
          message: "User has been deleted!",
        });
      })
      .catch((err) => {
        res.json({
          message: err.message,
        });
      });
  },
  //update User
  async updateUser(req, res) {
    const { id } = req.params;

    const role = req.user.role;
    const userId = req.user.id;

    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      return res.json({ message: "User not found!" });
    }

    if (role === "admin") {
      const { email, password, role } = req.body;
      const hash = await bcrypt.hash(password, 10);
      await User.update(
        {
          email: email,
          password: hash,
          role: role,
        },
        { where: { id: id } }
      )
        .then((result) => {
          res.json({
            message: "User has been updated!",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (parseInt(id) !== userId) {
        return res.status(403).json({ error: "Access denied!" });
      }

      const { email, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      await User.update(
        {
          email: email,
          password: hash,
        },
        { where: { id: id } }
      )
        .then((result) => {
          res.json({
            message: "User has been updated!",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};

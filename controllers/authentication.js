const md5 = require("md5");
const { generateTokens } = require("../utils/auth");
const { User } = require("../models");

module.exports = {
  //register untuk admin
  async registerAdmin(req, res) {
    const dataUser = {
      email: req.body.email,
      password: md5(req.body.password),
      role: "admin",
    };
    const user = await User.create(dataUser);

    if (!user) {
      res.status(400).json({ error: "Register failed!" });
    } else {
      const { password, ...data } = await user.toJSON();

      res.json({
        message: "Admin Registered!",
        data,
      });
    }
  },
  //register untuk user
  async registerUser(req, res) {
    const dataUser = {
      email: req.body.email,
      password: md5(req.body.password),
      role: "user",
    };
    const user = await User.create(dataUser);

    if (!user) {
      res.status(400).json({ error: "Register failed!" });
    } else {
      const { password, ...data } = await user.toJSON();

      res.json({
        message: "User Registered!",
        data,
      });
    }
  },
  //login untuk user dan admin
  async login(req, res) {
    const requetData = {
      email: req.body.email,
      password: md5(req.body.password),
    };

    const user = await User.findOne({ where: { email: requetData.email } });

    if (!user) {
      res.status(400).json({ error: "User Doesn't Exist!" });
    } else {
      if (requetData.password !== user.password) {
        res.status(400).json({ error: "Invalid password!" });
      } else {
        const accessToken = generateTokens(user);
        res.cookie("access_token", accessToken, {
          maxAge: 24 * 60 * 60 * 1000,
        });

        const { password, ...data } = await user.toJSON();

        res.json({
          message: "Logged in Succesfully!",
          data,
        });
      }
    }
  },
  //logou user
  logout(req, res) {
    // Hapus cookie 'access_token'
    res.clearCookie("access_token");
    res.json({ message: "Logged out successfully" });
  },
};

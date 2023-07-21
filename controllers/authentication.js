const md5 = require("md5");
const { generateTokens } = require("../utils/auth");
const { User } = require("../models");
const { validationResult } = require("express-validator");

module.exports = {
  //register untuk admin
  async registerAdmin(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const dataUser = {
      email: req.body.email,
      password: md5(req.body.password),
      role: "admin",
    };

    const existingEmail = await User.findOne({
      where: { email: dataUser.email },
    });
    if (existingEmail) {
      return res
        .status(409)
        .json({ error: `User email ${dataUser.email} already exist!` });
    }

    const user = await User.create(dataUser);

    if (!user) {
      res.status(400).json({ error: "Register failed!" });
    } else {
      const { password, ...data } = await user.toJSON();

      res.status(201).json({
        message: "Admin Registered!",
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

        res.status(200).json({
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
    res.status(200).json({ message: "Logged out successfully" });
  },
};

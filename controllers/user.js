const { User } = require("../models");
const md5 = require("md5");
const { generateTokens } = require("../auth");

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
        // res.set("Authorization", accessToken);

        const { password, ...data } = await user.toJSON();

        res.json({
          message: "Logged in Succesfully!",
          data,
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
    try {
      const users = await User.findAll();

      const usersWithoutPassword = users.map((user) => {
        const { password, ...userData } = user.toJSON();
        return userData;
      });

      res.json(usersWithoutPassword);
    } catch (err) {
      console.log(err);
    }
  },
  //get user profile based on role and id
  async getUser(req, res) {
    const { id } = req.params;
    const tokenUserId = req.user.id;
    const role = req.user.role;

    const user = await User.findOne({
      where: { id: id },
    });

    if (role === "admin") {
      const { password, ...data } = await user.toJSON();

      res.json({
        message: "get profile succesfully!",
        data,
      });
    } else {
      // Memeriksa apakah ID pengguna dalam token sama dengan ID pengguna dalam URL
      if (parseInt(id) !== tokenUserId) {
        return res.status(403).json({ error: "Access denied!" });
      }

      const { password, ...data } = await user.toJSON();

      res.json({
        message: "get profile succesfully!",
        data,
      });
    }
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
      const dataUser = {
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
      };
      const [rowsAffected] = await User.update(dataUser, { where: { id: id } });

      if (rowsAffected === 0) {
        res.status(400).json({ error: "nothing to Update!" });
      } else {
        const responseData = { ...dataUser };
        delete responseData.password;

        res.json({
          message: "User has been updated!",
          responseData,
        });
      }
    } else {
      if (parseInt(id) !== userId) {
        return res.status(403).json({ error: "Access denied!" });
      }

      const dataUser = {
        email: req.body.email,
        password: md5(req.body.password),
      };
      const [rowsAffected] = await User.update(dataUser, { where: { id: id } });

      if (rowsAffected === 0) {
        res.status(400).json({ error: "nothing to Update!" });
      } else {
        const responseData = { ...dataUser };
        delete responseData.password;

        res.json({
          message: "User has been updated!",
          responseData,
        });
      }
    }
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
};

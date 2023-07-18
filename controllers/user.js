const { User } = require("../models");
const md5 = require("md5");
// const { paginatedResult } = require("../utils/pagination");

module.exports = {
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
    // try {
    //   const page = parseInt(req.query.page) || 1;
    //   const limit = parseInt(req.query.limit) || 10;

    //   const paginatedData = await paginatedResult(User, page, limit);

    //   const usersWithoutPassword = paginatedData.results.map((user) => {
    //     const { password, ...userData } = user.toJSON();
    //     return userData;
    //   });

    //   res.json({
    //     message: "get user successfully!",
    //     data: {
    //       results: usersWithoutPassword,
    //       previous: paginatedData.previous,
    //       next: paginatedData.next,
    //     },
    //   });
    // } catch (error) {
    //   console.log(error);
    //   res.json({ message: error.message });
    // }
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

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
    if (!user) {
      return res.status(400).json({ message: "Karyawan not found!" });
    }

    if (role === "admin") {
      res.json({
        message: "get profile succesfully!",
        user,
      });
    } else {
      // Memeriksa apakah ID pengguna dalam token sama dengan ID pengguna dalam URL
      if (parseInt(id) !== tokenUserId) {
        return res.status(403).json({ error: "Access denied!" });
      }
      res.json({
        message: "get profile succesfully!",
        user,
      });
    }
  },
  //update User
  async updateUser(req, res) {
    const { id } = req.params;
    const { role, id: userId } = req.user;

    const user = await User.findOne({ where: { id: id } });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isAdmin = role === "admin";
    const dataUser = {
      email: req.body.email,
      password: md5(req.body.password),
    };

    const existingUser = await User.findOne({
      where: { email: dataUser.email },
    });
    if (existingUser && existingUser.id !== userId) {
      return res.status(400).json({ error: "Email already exists!" });
    }

    if (isAdmin || parseInt(id) === userId) {
      if (isAdmin) {
        dataUser.role = req.body.role;
      }

      const [rowsAffected] = await User.update(dataUser, { where: { id: id } });

      if (rowsAffected === 0) {
        res.status(400).json({ error: "Nothing to Update!" });
      } else {
        const responseData = { ...dataUser };
        delete responseData.password;

        res.json({
          message: "User has been updated!",
          responseData,
        });
      }
    } else {
      res.status(403).json({ error: "Access denied!" });
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
  //search user
  async findUser(req, res) {
    const keyword = req.body.keyword;

    await User.findAll({
      where: {
        [operator.or]: {
          id: { [operator.like]: `%${keyword}%` },
          email: { [operator.like]: `%${keyword}%` },
          role: { [operator.like]: `%${keyword}%` },
        },
      },
    })
      .then((result) => {
        res.json({ count: result.length, data: result });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },
};

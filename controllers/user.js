const { User } = require("../models");
const md5 = require("md5");
const { validationResult } = require("express-validator");
// const { paginatedResult } = require("../utils/pagination");

module.exports = {
  //tambah user
  async addUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const dataUser = {
      email: req.body.email,
      password: md5(req.body.password),
      role: req.body.role,
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
      res.status(400).json({ error: "Add user failed!" });
    } else {
      const { password, ...data } = await user.toJSON();

      res.status(201).json({
        message: "Add user successfully!",
        data,
      });
    }
  },
  //get all data user
  async getAll(req, res) {
    try {
      const users = await User.findAll();

      const usersWithoutPassword = users.map((user) => {
        const { password, ...userData } = user.toJSON();
        return userData;
      });

      res.status(200).json(usersWithoutPassword);
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

    //   res.status(200).json({
    //     message: "get user successfully!",
    //     data: {
    //       results: usersWithoutPassword,
    //       previous: paginatedData.previous,
    //       next: paginatedData.next,
    //     },
    //   });
    // } catch (error) {
    //   console.log(error);
    //   res.status(500).json({ message: error.message });
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
      return res.status(404).json({ message: "Karyawan not found!" });
    }

    if (role === "admin") {
      res.status(200).json({
        message: "get profile succesfully!",
        user,
      });
    } else {
      // Memeriksa apakah ID pengguna dalam token sama dengan ID pengguna dalam URL
      if (parseInt(id) !== tokenUserId) {
        return res.status(403).json({ error: "Access denied!" });
      }
      res.status(200).json({
        message: "get profile succesfully!",
        user,
      });
    }
  },
  //update User
  async updateUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const { id } = req.params;
      const { role, id: userId } = req.user;
      const user = await User.findOne({ where: { id: id } });

      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      const isAdmin = role === "admin";
      const dataUser = {
        email: req.body.email,
      };

      if (req.body.password.length > 0) {
        dataUser.password = md5(req.body.password);
      }

      const existingUser = await User.findOne({
        where: { email: dataUser.email },
      });

      if (existingUser && existingUser.id !== parseInt(id)) {
        return res.status(409).json({ error: "Email already exists!" });
      }

      if (!isAdmin && parseInt(id) !== userId) {
        return res.status(403).json({ error: "Access denied!" });
      }

      if (isAdmin) {
        dataUser.role = req.body.role;
      }

      const [rowsAffected] = await User.update(dataUser, {
        where: { id: id },
      });

      if (rowsAffected === 0) {
        return res.status(200).json({ error: "Nothing to Update!" });
      }

      const responseData = { ...dataUser };
      delete responseData.password;

      res.status(201).json({
        message: "User has been updated!",
        dataUser,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  //delete user, only admin
  async deleteUser(req, res) {
    const { id } = req.params;

    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    await User.destroy({ where: { id: id } })
      .then((result) => {
        res.status(201).json({
          statusCode: res.statusCode,
          message: "User has been deleted!",
        });
      })
      .catch((err) => {
        res.status(500).json({
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
        res.status(200).json({ count: result.length, data: result });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  },
};

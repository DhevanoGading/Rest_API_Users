const { generateTokens } = require("../jwt");
const { User } = require("../models");

module.exports = {
  async login(req, res) {
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
  },
  async registerAdmin(req, res) {
    const { email, password } = req.body;
    try {
      const hash = bcrypt.hash(password, 10);
      const result = await User.create({
        email: email,
        password: hash,
        role: "admin",
      });
      res.json({
        data: result,
        message: "Admin Registered!",
      });
    } catch (error) {
      res.status(400).json({ error: err });
    }
  },
  async registerUser(req, res) {
    const { email, password } = req.body;
    try {
      const hash = bcrypt.hash(password, 10);
      const result = await User.create({
        email: email,
        password: hash,
        role: "user",
      });
      res.json({
        data: result,
        message: "User Registered!",
      });
    } catch (error) {
      res.status(400).json({ error: err });
    }
  },
  logout(req, res) {
    res.clearCookie("access-token");
    res.json({ message: "Logged out successfully" });
  },
  async getAll(req, res) {
    try {
      const result = await User.findAll();
      res.json({
        data: result,
        message: "Get all data successfully!",
      });
    } catch (error) {
      console.log(err);
    }
  },
  async getUser(req, res) {
    try {
      const { id } = req.params;
      const tokenUserId = req.user.id;

      if (parseInt(id) !== tokenUserId) {
        return res.status(403).json({ error: "Access denied!" });
      }
      const result = await User.findOne({ where: { id: id } });

      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.log(err);
    }
  },
};

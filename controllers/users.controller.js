const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const uuid = require("uuid");
const fs = require("fs");

module.exports.usersController = {
  postUser: async (req, res) => {
    try {
      const { email, password, name, avatar } = req.body;

      const hash = await bcrypt.hash(password, 10);

      const findLog = await User.findOne({ email });

      if (findLog) {
        return res
          .status(401)
          .json({ error: "Пользователь с таким логином уже существует" });
      }

      await User.create({
        email,
        name,
        avatar,
        password: hash,
      });
      res.json("Пользователь создан");
    } catch (err) {
      res
        .status(400)
        .json({ error: `Ошибка при регистрации: ${err.toString()}` });
    }
  },
  getUsers: async (req, res) => {
    try {
      const data = await User.find({});
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  },
  getUser: async (req, res) => {
    try {
      const data = await User.findById(req.params.id);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (!candidate) {
        return res.status(401).json({ error: "Неверный email" });
      }

      const valid = await bcrypt.compare(password, candidate.password);

      if (!valid) {
        return res.status(401).json({ error: "Неверный пароль" });
      }

      const payload = {
        id: candidate._id,
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "24h",
      });

      return res.json({ token, id: payload.id });
    } catch (err) {
      res.json(err);
    }
  },
  uploadAvatar: async (req, res) => {
    try {
      const file = req.files.file;
      const user = await User.findById(req.user.id);
      const avatarName = uuid.v4() + ".jpg";

      file.mv(`./public/${avatarName}`);
      user.avatar = avatarName;

      await user.save();
      res.json(avatarName);
    } catch (e) {
      res.json(e);
    }
  },
  removeAvatar: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      fs.unlinkSync(`./public/${user.avatar}`);
      user.avatar = null;
      await user.save();

      res.json("Аватар удален");
    } catch (e) {
      res.json(e);
    }
  },
};

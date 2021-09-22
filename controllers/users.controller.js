const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const Token = require("../models/Token.model");
const nodemailer = require("nodemailer");

module.exports.usersController = {
  registration: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      const hash = await bcrypt.hash(password, 8);

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.json("Пользователь с таким email уже существует");
      }
      const activationLink = uuid.v4();

      const data = await User.create({
        name,
        email,
        password: hash,
        activationLink,
      });

      const payload = {
        email: data.email,
        id: data._id,
        isActivated: data.isActivated,
      };

      const accessToken = await jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET,
        {
          expiresIn: "30m",
        }
      );
      const refreshToken = await jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET,
        {
          expiresIn: "30d",
        }
      );

      const tokens = { accessToken, refreshToken };

      const tokenData = await Token.findOne({ user: payload.id });
      if (tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
      } else {
        await Token.create({ user: payload.id, refreshToken });
      }

      const link = `${process.env.API_URL}activate/${activationLink}`;

      let transporter = nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true,
        auth: {
          user: `${process.env.nodemailer_login}`,
          pass: `${process.env.nodemailer_password}`,
        },
      });

      await transporter.sendMail({
        from: `${process.env.nodemailer_login}`,
        to: email,
        subject: `Активация аккаунта ${process.env.API_URL}`,
        text: ``,
        html: `
        <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href=${link}>${link}</a>
        </div>
        `,
      });

      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.json({ ...tokens, payload });
    } catch (e) {
      res.json(e);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (!candidate) {
        return res.status(401).json({ error: "неверный логин" });
      }

      const valid = await bcrypt.compare(password, candidate.password);

      if (!valid) {
        return res.status(401).json({ error: "неверный пароль" });
      }

      const payload = {
        email: candidate.email,
        id: candidate._id,
        isActivated: candidate.isActivated,
      };

      const accessToken = await jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET,
        {
          expiresIn: "30m",
        }
      );
      const refreshToken = await jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET,
        {
          expiresIn: "30d",
        }
      );

      const tokens = { accessToken, refreshToken };

      const tokenData = await Token.findOne({ user: payload.id });
      if (tokenData) {
        tokenData.refreshToken = refreshToken;
        tokenData.save();
      } else {
        await Token.create({ user: payload.id, refreshToken });
      }

      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.json({ ...tokens, payload });
    } catch (e) {
      res.json(e);
    }
  },
  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;

      const token = await Token.deleteOne({ refreshToken });
      res.clearCookie("refreshToken");
      res.json(token);
    } catch (e) {
      res.json(e);
    }
  },
  activate: async (req, res, next) => {
    try {
      const activationLink = req.params.link;
      const user = await User.findOne({ activationLink });

      if (!user) {
        return res.json("err");
      }
      user.isActivated = true;
      await user.save();
      res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      res.json(e);
    }
  },
  refresh: async (req, res, next) => {
    try {
    } catch (e) {
      res.json(e);
    }
  },
  getUsers: async (req, res, next) => {
    try {
    } catch (e) {
      res.json(e);
    }
  },
};

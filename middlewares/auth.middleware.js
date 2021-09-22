const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { autorization } = req.headers;

  if (!autorization) {
    return res.status(401).json("Нет доступа у тибя");
  }

  const [type, token] = autorization.split(" ");

  if (type !== "Bearer") {
    return res.status(401).json("Неверный тип токена у тибя");
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT_KEY);

    next();
  } catch (e) {
    return res.status(401).json("Неверный токен у тибя");
  }
};

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();

app.use(express.json({ limit: "50mb", extended: true }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(cors());
app.use(express.static(path.resolve(__dirname, "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
app.use(fileUpload());
app.use(require("./routes/index"));

mongoose.connect(process.env.MONGO).then(() => {
  app.listen(process.env.PORT, () => console.log("Server has been started..."));

  console.log("Connected with MongoDB");
});

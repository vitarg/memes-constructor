const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(require('./routes/index'))

mongoose.connect(process.env.MONGO).then(() => {
  app.listen(() => console.log("Server has been started..."));

  console.log("Connected with MongoDB");
});

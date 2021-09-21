const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload());
app.use(require("./routes/index"));

mongoose.connect(process.env.MONGO).then(() => {
  app.listen(process.env.PORT, () => console.log("Server has been started..."));

  console.log("Connected with MongoDB");
});

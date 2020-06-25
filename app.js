const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const routerPost = require("./routes/register_and_login");
const BodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();

mongoose.connect(
  process.env.DM_CONATION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("hi DB");
  }
);

app.use(BodyParser.json());
app.use("/user", routerPost);

app.get("/", (req, res) => {
  res.send("hi amal you are in the home ");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);

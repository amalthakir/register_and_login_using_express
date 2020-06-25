const express = require("express");
const router = express.Router();
const User = require("../modules/UserModules");
const uuid = require("uuid");
const core = require("cors");
const jwk = require("jsonwebtoken");
router.use(core());

process.env.SECRET_KEY = "secret";

router.post("/register", (req, res) => {
  let UserData = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };

  User.findOne({
    email: req.body.email,
  })
    .then((found) => {
      if (!found) {
        User.create(UserData)
          .then((data) => {
            res.json({ status: data.email + "user registered" });
          })
          .catch((err) => {
            res.send(err);
          });
      } else {
        res.json({ error: "user already existed" });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/login", (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((found) => {
      if (found) {
        if (req.body.password === found.password) {
          let payload = {
            _id: found._id,
            name: found.name,
            username: found.username,
            password: found.password,
            email: found.email,
          };

          let token = jwk.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440,
          });
          res.send(token);
        } else {
          res.json({ error: "Check your email and password" });
        }
      } else {
        res.json({ error: "Check your email and password" });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;

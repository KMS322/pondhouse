const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User } = require("../models");
const { isNotLoggedIn } = require("./middlewares");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["admin_pw"],
        },
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/signup", isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        admin_id: req.body.adminId,
      },
    });
    if (exUser) {
      return res.status(403).send("회원가입을 할 수 없습니다.");
    } else {
      const hashedPassword = await bcrypt.hash(req.body.adminPw, 12);
      const createdUser = await User.create({
        admin_id: req.body.adminId,
        admin_pw: hashedPassword,
      });
    }

    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: ["admin_id"],
      });

      console.log("fullUserWithoutPassword : ", fullUserWithoutPassword);
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

module.exports = router;

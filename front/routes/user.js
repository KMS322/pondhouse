const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
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
      return res.status(403).send("이미 사용중인 아이디 입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.adminPw, 12);

    const createdUser = await User.create({
      admin_id: req.body.adminId,
      admin_pw: hashedPassword,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/login", isNotLoggedIn, async (req, res, next) => {
  try {
    console.log("req.body : ", req.body);

    const user = await User.findOne({
      where: {
        admin_id: req.body.adminId,
      },
    });
    const result = await bcrypt.compare(req.body.adminPw, user.admin_pw);
    if (result) {
      res.status(200).json(user);
    } else {
      res.status(401).send("비밀번호가 틀렸습니다.");
    }
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/checkId", isNotLoggedIn, async (req, res, next) => {
  try {
    if (req.body.user_member_id) {
      const sameIdUser = await User.findOne({
        where: {
          user_member_id: req.body.user_member_id,
        },
      });
      if (sameIdUser) {
        return res.status(403).send("이미 사용중인 아이디 입니다.");
      }
    } else if (req.body.business_member_id) {
      const sameIdUser = await User.findOne({
        where: {
          user_member_id: req.body.business_member_id,
        },
      });
      if (sameIdUser) {
        return res.status(403).send("이미 사용중인 아이디 입니다.");
      }
    }

    return res.status(200).send("사용하실 수 있는 아이디 입니다.");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/changePassword", isLoggedIn, async (req, res, next) => {
  try {
    const changeUser = await User.findOne({
      where: {
        id: req.body.userID,
      },
    });
    console.log("changeUser : ", changeUser);
    const currentPasswordMatch = await bcrypt.compare(
      req.body.user_currentPW,
      changeUser.user_member_pw
    );

    if (!currentPasswordMatch) {
      return res.status(401).send("현재 비밀번호가 일치하지 않습니다.");
    }
    const hashedNewPassword = await bcrypt.hash(req.body.changePassword, 12);
    changeUser.user_member_pw = hashedNewPassword;
    await changeUser.save();

    res.status(200).send("비밀번호가 성공적으로 변경되었습니다.");
  } catch (error) {
    console.error(error);
    next(error);
  }
});
router.post("/logout", isLoggedIn, (req, res) => {
  req.logout(() => {
    // res.redirect("/");
  });
  res.status(201).send("ok");
});

module.exports = router;

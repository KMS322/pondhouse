const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const {
  User,
  BusinessRecruitment,
  BusinessApplication,
  UserBusiness,
} = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const router = express.Router();

router.post("/signup", isNotLoggedIn, async (req, res, next) => {
  try {
    const exBusiness = await User.findOne({
      where: {
        user_member_id: req.body.business_member_id,
      },
    });
    if (exBusiness) {
      return res.status(403).send("이미 사용중인 아이디 입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.business_member_pw, 12);
    const createdUser = await User.create({
      userType: req.body.userType,
      user_member_id: req.body.business_member_id,
      user_member_pw: hashedPassword,
    });
    if (req.body.userType === "business") {
      await UserBusiness.create({
        business_member_companyName: req.body.business_member_companyName,
        business_member_companyNumber: req.body.business_member_companyNumber,
        business_member_name: req.body.business_member_name,
        business_member_companyState: req.body.business_member_companyState,
        business_member_employeeNumber: req.body.business_member_employeeNumber,
        business_member_officeState: req.body.business_member_officeState,
        business_member_jibunAddress: req.body.business_member_jibunAddress,
        business_member_detailAddress: req.body.business_member_detailAddress,
        business_member_roadAddress: req.body.business_member_roadAddress,
        business_member_tel: req.body.business_member_tel,
        business_member_email: req.body.business_member_email,
        BusinessId: createdUser.id,
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
      const fullBusinessWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["business_member_pw"],
        },
        include: [
          {
            model: BusinessRecruitment,
            attributes: ["id"],
          },
          {
            model: BusinessApplication,
            attributes: ["id"],
          },
        ],
      });

      return res.status(200).json(fullBusinessWithoutPassword);
    });
  })(req, res, next);
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.logout(() => {
    // res.redirect("/");
  });
  res.status(201).send("ok");
});

module.exports = router;

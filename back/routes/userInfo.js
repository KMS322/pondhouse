const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { UserIndividual, UserBusiness } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const router = express.Router();

router.get("/individual", isLoggedIn, async (req, res, next) => {
  try {
    if (req.user) {
      const individualInfo = await UserIndividual.findOne({
        where: { IndividualId: req.user.id },
      });
      res.status(200).json(individualInfo);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/business", isLoggedIn, async (req, res, next) => {
  try {
    if (req.user) {
      const businessInfo = await UserBusiness.findOne({
        where: { BusinessId: req.user.id },
      });
      res.status(200).json(businessInfo);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/changeIndividual", isLoggedIn, async (req, res, next) => {
  try {
    const fullAddress =
      req.body.user_member_address1 + " " + req.body.user_member_address2;
    const changeIndividual = await UserIndividual.update(
      {
        user_member_name: req.body.user_member_name,
        user_member_num: req.body.user_member_num,
        user_member_address: fullAddress,
        user_member_tel: req.body.user_member_tel,
        user_member_email: req.body.user_member_email,
      },
      {
        where: { IndividualId: req.body.userID },
        returning: true,
      }
    );
    res.status(201).json(changeIndividual);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/changeBusiness", isLoggedIn, async (req, res, next) => {
  try {
    const fullAddress =
      req.body.user_member_address1 + " " + req.body.user_member_address2;
    const changeBusiness = await UserBusiness.update(
      {
        business_member_companyName: req.body.business_member_companyName,
        business_member_companyNumber: req.body.business_member_companyNumber,
        business_member_name: req.body.business_member_name,
        business_member_companyState: req.body.business_member_companyState,
        business_member_employeeNumber: req.body.business_member_employeeNumber,
        business_member_officeState: req.body.business_member_officeState,
        business_member_address: fullAddress,
        business_member_tel: req.body.business_member_tel,
        business_member_email: req.body.business_member_email,
      },
      {
        where: { BusinessId: req.body.userID },
        returning: true,
      }
    );
    res.status(201).json(changeBusiness);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;

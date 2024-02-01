const express = require("express");
const router = express.Router();
const { User, BusinessRecruitment } = require("../models");
const { isLoggedIn } = require("./middlewares");

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const recruitment = await BusinessRecruitment.create({
      business_recruitment_name: req.body.business_recruitment_name,
      business_recruitment_tel: req.body.business_recruitment_tel,
      business_recruitment_email: req.body.business_recruitment_email,
      business_recruitment_phone: req.body.business_recruitment_phone,
      business_recruitment_insurance1: req.body.business_recruitment_insurance1,
      business_recruitment_insurance2: req.body.business_recruitment_insurance2,
      business_recruitment_insurance3: req.body.business_recruitment_insurance3,
      business_recruitment_insurance4: req.body.business_recruitment_insurance4,
      business_recruitment_insurance5: req.body.business_recruitment_insurance5,
      business_recruitment_welfare1: req.body.business_recruitment_welfare1,
      business_recruitment_welfare2: req.body.business_recruitment_welfare2,
      business_recruitment_welfare3: req.body.business_recruitment_welfare3,
      business_recruitment_welfare4: req.body.business_recruitment_welfare4,
      business_recruitment_welfare5: req.body.business_recruitment_welfare5,
      business_recruitment_welfare6: req.body.business_recruitment_welfare6,
      business_recruitment_welfare7: req.body.business_recruitment_welfare7,
      business_recruitment_welfare8: req.body.business_recruitment_welfare8,
      business_recruitment_welfare9: req.body.business_recruitment_welfare9,
      business_recruitment_welfare10: req.body.business_recruitment_welfare10,
      business_recruitment_meal: req.body.business_recruitment_meal,
      business_recruitment_handicapped1:
        req.body.business_recruitment_handicapped1,
      business_recruitment_handicapped2:
        req.body.business_recruitment_handicapped2,
      business_recruitment_handicapped3:
        req.body.business_recruitment_handicapped3,
      business_recruitment_handicapped4:
        req.body.business_recruitment_handicapped4,
      business_recruitment_handicapped5:
        req.body.business_recruitment_handicapped5,
      business_recruitment_handicapped6:
        req.body.business_recruitment_handicapped6,
      business_recruitment_program1: req.body.business_recruitment_program1,
      business_recruitment_program2: req.body.business_recruitment_program2,
      business_recruitment_program3: req.body.business_recruitment_program3,
      business_recruitment_program4: req.body.business_recruitment_program4,
      business_recruitment_program5: req.body.business_recruitment_program5,
      business_recruitment_program6: req.body.business_recruitment_program6,
      business_recruitment_accountingProgram:
        req.body.business_recruitment_accountingProgram,
      business_recruitment_accountingProgramLevel:
        req.body.business_recruitment_accountingProgramLevel,
      business_recruitment_abilityDrive1:
        req.body.business_recruitment_abilityDrive1,
      business_recruitment_abilityDrive2:
        req.body.business_recruitment_abilityDrive2,
      business_recruitment_major1: req.body.business_recruitment_major1,
      business_recruitment_major2: req.body.business_recruitment_major2,
      BusinessId: req.user.id,
    });
    const fullRecruitment = await BusinessRecruitment.findOne({
      where: { id: recruitment.id },
      include: [
        {
          model: User,
        },
      ],
    });
    res.status(201).json(fullRecruitment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/", (req, res) => {});

module.exports = router;

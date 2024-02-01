const express = require("express");
const router = express.Router();
const { UserCareer, User, UserIndividual } = require("../models");
const { isLoggedIn } = require("./middlewares");

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const career = await UserCareer.create({
      user_career_company1: req.body.user_career_company1,
      user_career_position1: req.body.user_career_position1,
      user_career_companyState1: req.body.user_career_companyState1,
      user_career_program1: req.body.user_career_program1,
      user_career_period11Year: req.body.user_career_period11Year,
      user_career_period11Month: req.body.user_career_period11Month,
      user_career_period12Year: req.body.user_career_period12Year,
      user_career_period12Month: req.body.user_career_period12Month,
      user_career_company2: req.body.user_career_company2,
      user_career_position2: req.body.user_career_position2,
      user_career_companyState2: req.body.user_career_companyState2,
      user_career_program2: req.body.user_career_program2,
      user_career_period21Year: req.body.user_career_period21Year,
      user_career_period21Month: req.body.user_career_period21Month,
      user_career_period22Year: req.body.user_career_period22Year,
      user_career_period22Month: req.body.user_career_period22Month,
      user_career_company3: req.body.user_career_company3,
      user_career_position3: req.body.user_career_position3,
      user_career_companyState3: req.body.user_career_companyState3,
      user_career_program3: req.body.user_career_program3,
      user_career_period31Year: req.body.user_career_period31Year,
      user_career_period31Month: req.body.user_career_period31Month,
      user_career_period32Year: req.body.user_career_period32Year,
      user_career_period32Month: req.body.user_career_period32Month,
      user_career_license1: req.body.user_career_license1,
      user_career_license1Year: req.body.user_career_license1Year,
      user_career_license1Month: req.body.user_career_license1Month,
      user_career_license1Day: req.body.user_career_license1Day,
      user_career_license1Organization:
        req.body.user_career_license1Organization,
      user_career_license2: req.body.user_career_license2,
      user_career_license2Year: req.body.user_career_license2Year,
      user_career_license2Month: req.body.user_career_license2Month,
      user_career_license2Day: req.body.user_career_license2Day,
      user_career_license2Organization:
        req.body.user_career_license2Organization,
      user_career_license3: req.body.user_career_license3,
      user_career_license3Year: req.body.user_career_license3Year,
      user_career_license3Month: req.body.user_career_license3Month,
      user_career_license3Day: req.body.user_career_license3Day,
      user_career_license3Organization:
        req.body.user_career_license3Organization,
      user_career_trainingName1: req.body.user_career_trainingName1,
      user_career_trainingPeriod11Year:
        req.body.user_career_trainingPeriod11Year,
      user_career_trainingPeriod11Month:
        req.body.user_career_trainingPeriod11Month,
      user_career_trainingPeriod12Year:
        req.body.user_career_trainingPeriod12Year,
      user_career_trainingPeriod12Month:
        req.body.user_career_trainingPeriod12Month,
      user_career_trainingDetail1: req.body.user_career_trainingDetail1,
      user_career_trainingOrganization:
        req.body.user_career_trainingOrganization,
      user_career_changeYear: req.body.user_career_changeYear,
      user_career_changeMonth: req.body.user_career_changeMonth,
      user_career_changeReason: req.body.user_career_changeReason,
      user_career_knowCount: req.body.user_career_knowCount,
      user_career_knowTax: req.body.user_career_knowTax,
      user_career_abilityProcess1: req.body.user_career_abilityProcess1,
      user_career_abilityProcess2: req.body.user_career_abilityProcess2,
      user_career_abilityProcess3: req.body.user_career_abilityProcess3,
      user_career_abilityProcess4: req.body.user_career_abilityProcess4,
      user_career_abilityProcess5: req.body.user_career_abilityProcess5,
      user_career_abilityProcess6: req.body.user_career_abilityProcess6,
      user_career_abilityDrive1: req.body.user_career_abilityDrive1,
      user_career_abilityDrive2: req.body.user_career_abilityDrive2,
      IndividualId: req.user.id,
    });
    const fullCareer = await UserCareer.findOne({
      where: { id: career.id },
      include: [
        {
          model: User,
        },
      ],
    });
    await UserIndividual.update(
      {
        user_member_career: req.body.userCareer,
      },
      {
        where: { IndividualId: career.IndividualId },
      }
    );
    res.status(201).json(fullCareer);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/change", isLoggedIn, async (req, res, next) => {
  try {
    const changedCareer = await UserCareer.update(
      {
        user_career_company1: req.body.user_career_company1,
        user_career_position1: req.body.user_career_position1,
        user_career_companyState1: req.body.user_career_companyState1,
        user_career_program1: req.body.user_career_program1,
        user_career_period11Year: req.body.user_career_period11Year,
        user_career_period11Month: req.body.user_career_period11Month,
        user_career_period12Year: req.body.user_career_period12Year,
        user_career_period12Month: req.body.user_career_period12Month,
        user_career_company2: req.body.user_career_company2,
        user_career_position2: req.body.user_career_position2,
        user_career_companyState2: req.body.user_career_companyState2,
        user_career_program2: req.body.user_career_program2,
        user_career_period21Year: req.body.user_career_period21Year,
        user_career_period21Month: req.body.user_career_period21Month,
        user_career_period22Year: req.body.user_career_period22Year,
        user_career_period22Month: req.body.user_career_period22Month,
        user_career_company3: req.body.user_career_company3,
        user_career_position3: req.body.user_career_position3,
        user_career_companyState3: req.body.user_career_companyState3,
        user_career_program3: req.body.user_career_program3,
        user_career_period31Year: req.body.user_career_period31Year,
        user_career_period31Month: req.body.user_career_period31Month,
        user_career_period32Year: req.body.user_career_period32Year,
        user_career_period32Month: req.body.user_career_period32Month,
        user_career_license1: req.body.user_career_license1,
        user_career_license1Year: req.body.user_career_license1Year,
        user_career_license1Month: req.body.user_career_license1Month,
        user_career_license1Day: req.body.user_career_license1Day,
        user_career_license1Organization:
          req.body.user_career_license1Organization,
        user_career_license2: req.body.user_career_license2,
        user_career_license2Year: req.body.user_career_license2Year,
        user_career_license2Month: req.body.user_career_license2Month,
        user_career_license2Day: req.body.user_career_license2Day,
        user_career_license2Organization:
          req.body.user_career_license2Organization,
        user_career_license3: req.body.user_career_license3,
        user_career_license3Year: req.body.user_career_license3Year,
        user_career_license3Month: req.body.user_career_license3Month,
        user_career_license3Day: req.body.user_career_license3Day,
        user_career_license3Organization:
          req.body.user_career_license3Organization,
        user_career_trainingName1: req.body.user_career_trainingName1,
        user_career_trainingPeriod11Year:
          req.body.user_career_trainingPeriod11Year,
        user_career_trainingPeriod11Month:
          req.body.user_career_trainingPeriod11Month,
        user_career_trainingPeriod12Year:
          req.body.user_career_trainingPeriod12Year,
        user_career_trainingPeriod12Month:
          req.body.user_career_trainingPeriod12Month,
        user_career_trainingDetail1: req.body.user_career_trainingDetail1,
        user_career_trainingOrganization:
          req.body.user_career_trainingOrganization,
        user_career_changeYear: req.body.user_career_changeYear,
        user_career_changeMonth: req.body.user_career_changeMonth,
        user_career_changeReason: req.body.user_career_changeReason,
        user_career_knowCount: req.body.user_career_knowCount,
        user_career_knowTax: req.body.user_career_knowTax,
        user_career_abilityProcess1: req.body.user_career_abilityProcess1,
        user_career_abilityProcess2: req.body.user_career_abilityProcess2,
        user_career_abilityProcess3: req.body.user_career_abilityProcess3,
        user_career_abilityProcess4: req.body.user_career_abilityProcess4,
        user_career_abilityProcess5: req.body.user_career_abilityProcess5,
        user_career_abilityProcess6: req.body.user_career_abilityProcess6,
        user_career_abilityDrive1: req.body.user_career_abilityDrive1,
        user_career_abilityDrive2: req.body.user_career_abilityDrive2,
        IndividualId: req.user.id,
      },
      {
        where: { id: req.body.careerId },
        returning: true,
      }
    );
    await UserIndividual.update(
      {
        user_member_career: req.body.userCareer,
      },
      {
        where: { IndividualId: req.user.id },
      }
    );
    res.status(201).json(changedCareer);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/", (req, res) => {});

module.exports = router;

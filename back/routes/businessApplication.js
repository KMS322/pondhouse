const express = require("express");
const router = express.Router();
const { User, BusinessApplication, UserBusiness } = require("../models");
const { isLoggedIn } = require("./middlewares");

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const application = await BusinessApplication.create({
      business_application_name: req.body.step1_data.business_application_name,
      business_application_type: req.body.step1_data.business_application_type,
      business_application_number:
        req.body.step1_data.business_application_number,
      business_application_startNow:
        req.body.step1_data.business_application_startNow,
      business_application_startYear:
        req.body.step1_data.business_application_startYear,
      business_application_startMonth:
        req.body.step1_data.business_application_startMonth,
      business_application_expectPeriod:
        req.body.step1_data.business_application_expectPeriod,
      business_application_workContent1:
        req.body.step1_data.business_application_workContent1,
      business_application_workContent2:
        req.body.step1_data.business_application_workContent2,
      business_application_workContent3:
        req.body.step1_data.business_application_workContent3,
      business_application_workContent4:
        req.body.step1_data.business_application_workContent4,
      business_application_workContent5:
        req.body.step1_data.business_application_workContent5,
      business_application_workContent6:
        req.body.step1_data.business_application_workContent6,
      business_application_workContent7:
        req.body.step1_data.business_application_workContent7,
      business_application_program:
        req.body.step1_data.business_application_program,
      business_application_program1:
        req.body.step1_data.business_application_program1,
      business_application_career:
        req.body.step1_data.business_application_career,
      business_application_careerMin:
        req.body.step1_data.business_application_careerMin,
      business_application_careerMax:
        req.body.step1_data.business_application_careerMax,
      business_application_schoolFinal:
        req.body.step1_data.business_application_schoolFinal,
      business_application_schoolLisence:
        req.body.step1_data.business_application_schoolLisence,
      business_application_schoolLisence1:
        req.body.step1_data.business_application_schoolLisence1,
      business_application_payType: req.body.business_application_payType,
      business_application_payMin: req.body.business_application_payMin,
      business_application_payMax: req.body.business_application_payMax,
      business_application_workTime1Hour:
        req.body.business_application_workTime1Hour,
      business_application_workTime1Minute:
        req.body.business_application_workTime1Minute,
      business_application_workTime2Hour:
        req.body.business_application_workTime2Hour,
      business_application_workTime2Minute:
        req.body.business_application_workTime2Minute,
      business_application_workTimeDay:
        req.body.business_application_workTimeDay,
      business_application_workTimeHour:
        req.body.business_application_workTimeHour,
      business_application_breakTime1Hour:
        req.body.business_application_breakTime1Hour,
      business_application_breakTime1Minute:
        req.body.business_application_breakTime1Minute,
      business_application_breakTime2Hour:
        req.body.business_application_breakTime2Hour,
      business_application_breakTime2Minute:
        req.body.business_application_breakTime2Minute,
      business_application_workPlace: req.body.business_application_workPlace,
      business_application_severancePay:
        req.body.business_application_severancePay,
      business_application_employmentType:
        req.body.business_application_employmentType,
      business_application_employmentTypeMonth:
        req.body.business_application_employmentTypeMonth,
      business_application_rank1: req.body.business_application_rank1,
      business_application_rank2: req.body.business_application_rank2,
      business_application_rank3: req.body.business_application_rank3,
      business_application_rank4: req.body.business_application_rank4,
      BusinessId: req.user.id,
    });
    const fullApplication = await BusinessApplication.findOne({
      where: { id: application.id },
      include: [
        {
          model: User,
        },
      ],
    });
    await UserBusiness.update(
      {
        business_member_workType: req.body.workType,
        business_member_pay: req.body.fullPay,
      },
      {
        where: {
          BusinessId: application.BusinessId,
        },
      }
    );
    res.status(201).json(fullApplication);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/change", isLoggedIn, async (req, res, next) => {
  try {
    const changedApplication = await BusinessApplication.update(
      {
        business_application_name:
          req.body.step1_data.business_application_name,
        business_application_type:
          req.body.step1_data.business_application_type,
        business_application_number:
          req.body.step1_data.business_application_number,
        business_application_startNow:
          req.body.step1_data.business_application_startNow,
        business_application_startYear:
          req.body.step1_data.business_application_startYear,
        business_application_startMonth:
          req.body.step1_data.business_application_startMonth,
        business_application_expectPeriod:
          req.body.step1_data.business_application_expectPeriod,
        business_application_workContent1:
          req.body.step1_data.business_application_workContent1,
        business_application_workContent2:
          req.body.step1_data.business_application_workContent2,
        business_application_workContent3:
          req.body.step1_data.business_application_workContent3,
        business_application_workContent4:
          req.body.step1_data.business_application_workContent4,
        business_application_workContent5:
          req.body.step1_data.business_application_workContent5,
        business_application_workContent6:
          req.body.step1_data.business_application_workContent6,
        business_application_workContent7:
          req.body.step1_data.business_application_workContent7,
        business_application_program:
          req.body.step1_data.business_application_program,
        business_application_program1:
          req.body.step1_data.business_application_program1,
        business_application_career:
          req.body.step1_data.business_application_career,
        business_application_careerMin:
          req.body.step1_data.business_application_careerMin,
        business_application_careerMax:
          req.body.step1_data.business_application_careerMax,
        business_application_schoolFinal:
          req.body.step1_data.business_application_schoolFinal,
        business_application_schoolLisence:
          req.body.step1_data.business_application_schoolLisence,
        business_application_schoolLisence1:
          req.body.step1_data.business_application_schoolLisence1,
        business_application_payType: req.body.business_application_payType,
        business_application_payMin: req.body.business_application_payMin,
        business_application_payMax: req.body.business_application_payMax,
        business_application_workTime1Hour:
          req.body.business_application_workTime1Hour,
        business_application_workTime1Minute:
          req.body.business_application_workTime1Minute,
        business_application_workTime2Hour:
          req.body.business_application_workTime2Hour,
        business_application_workTime2Minute:
          req.body.business_application_workTime2Minute,
        business_application_workTimeDay:
          req.body.business_application_workTimeDay,
        business_application_workTimeHour:
          req.body.business_application_workTimeHour,
        business_application_breakTime1Hour:
          req.body.business_application_breakTime1Hour,
        business_application_breakTime1Minute:
          req.body.business_application_breakTime1Minute,
        business_application_breakTime2Hour:
          req.body.business_application_breakTime2Hour,
        business_application_breakTime2Minute:
          req.body.business_application_breakTime2Minute,
        business_application_workPlace: req.body.business_application_workPlace,
        business_application_severancePay:
          req.body.business_application_severancePay,
        business_application_employmentType:
          req.body.business_application_employmentType,
        business_application_employmentTypeMonth:
          req.body.business_application_employmentTypeMonth,
        business_application_rank1: req.body.business_application_rank1,
        business_application_rank2: req.body.business_application_rank2,
        business_application_rank3: req.body.business_application_rank3,
        business_application_rank4: req.body.business_application_rank4,
        BusinessId: req.user.id,
      },
      {
        where: { id: req.body.applicationId },
      }
    );
    await UserBusiness.update(
      {
        business_member_workType: req.body.workType,
        business_member_pay: req.body.fullPay,
      },
      {
        where: {
          BusinessId: req.user.id,
        },
      }
    );
    res.status(201).json(changedApplication);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/remove", isLoggedIn, async (req, res, next) => {
  try {
    const deletedApplication = await BusinessApplication.destroy({
      where: {
        id: req.body.id,
        BusinessId: req.user.id,
      },
    });
    if (deletedApplication) {
      res.status(200).json({ ApplicationId: parseInt(req.body.data, 10) });
    } else {
      res.status(404).json({ error: "Application not found" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

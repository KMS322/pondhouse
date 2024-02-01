const express = require("express");
const router = express.Router();
const { UserResume, User, UserIndividual } = require("../models");
const { isLoggedIn } = require("./middlewares");

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const resume = await UserResume.create({
      user_resume_title: req.body.user_resume_title,
      user_resume_school: req.body.user_resume_school,
      user_resume_schoolMajor: req.body.user_resume_schoolMajor,
      user_resume_schoolPeriod1Year: req.body.user_resume_schoolPeriod1Year,
      user_resume_schoolPeriod1Month: req.body.user_resume_schoolPeriod1Month,
      user_resume_schoolPeriod2Year: req.body.user_resume_schoolPeriod2Year,
      user_resume_schoolPeriod2Month: req.body.user_resume_schoolPeriod2Month,
      user_resume_schoolFinal: req.body.user_resume_schoolFinal,
      user_resume_hopeCompany: req.body.user_resume_hopeCompany,
      user_resume_hopeRegion1: req.body.user_resume_hopeRegion1,
      user_resume_hopeRegion2: req.body.user_resume_hopeRegion2,
      user_resume_hopeRegion: req.body.user_resume_hopeRegion,
      user_resume_hopePayType1: req.body.user_resume_hopePayType1,
      user_resume_hopePayType2: req.body.user_resume_hopePayType2,
      user_resume_hopePay: req.body.user_resume_hopePay,
      user_resume_hopeWork1: req.body.user_resume_hopeWork1,
      user_resume_hopeWork2: req.body.user_resume_hopeWork2,
      user_resume_hopeWork3: req.body.user_resume_hopeWork3,
      user_resume_hopeWork4: req.body.user_resume_hopeWork4,
      user_resume_hopeStartYear: req.body.user_resume_hopeStartYear,
      user_resume_hopeStartMonth: req.body.user_resume_hopeStartMonth,
      user_resume_hopeStartDay: req.body.user_resume_hopeStartDay,
      user_resume_hopeWorkTime1Hour: req.body.user_resume_hopeWorkTime1Hour,
      user_resume_hopeWorkTime1Minute: req.body.user_resume_hopeWorkTime1Minute,
      user_resume_hopeWorkTime2Hour: req.body.user_resume_hopeWorkTime2Hour,
      user_resume_hopeWorkTime2Minute: req.body.user_resume_hopeWorkTime2Minute,
      IndividualId: req.user.id,
    });
    const fullResume = await UserResume.findOne({
      where: { id: resume.id },
      include: [
        {
          model: User,
        },
      ],
    });

    await UserIndividual.update(
      {
        user_member_workType: req.body.workType,
      },
      {
        where: { IndividualId: req.user.id },
      }
    );
    res.status(201).json(fullResume);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/change", isLoggedIn, async (req, res, next) => {
  try {
    const changedResume = await UserResume.update(
      {
        user_resume_title: req.body.user_resume_title,
        user_resume_school: req.body.user_resume_school,
        user_resume_schoolMajor: req.body.user_resume_schoolMajor,
        user_resume_schoolPeriod1Year: req.body.user_resume_schoolPeriod1Year,
        user_resume_schoolPeriod1Month: req.body.user_resume_schoolPeriod1Month,
        user_resume_schoolPeriod2Year: req.body.user_resume_schoolPeriod2Year,
        user_resume_schoolPeriod2Month: req.body.user_resume_schoolPeriod2Month,
        user_resume_schoolFinal: req.body.user_resume_schoolFinal,
        user_resume_hopeCompany: req.body.user_resume_hopeCompany,
        user_resume_hopeRegion1: req.body.user_resume_hopeRegion1,
        user_resume_hopeRegion2: req.body.user_resume_hopeRegion2,
        user_resume_hopeRegion: req.body.user_resume_hopeRegion,
        user_resume_hopePayType1: req.body.user_resume_hopePayType1,
        user_resume_hopePayType2: req.body.user_resume_hopePayType2,
        user_resume_hopePay: req.body.user_resume_hopePay,
        user_resume_hopeWork1: req.body.user_resume_hopeWork1,
        user_resume_hopeWork2: req.body.user_resume_hopeWork2,
        user_resume_hopeWork3: req.body.user_resume_hopeWork3,
        user_resume_hopeWork4: req.body.user_resume_hopeWork4,
        user_resume_hopeStartYear: req.body.user_resume_hopeStartYear,
        user_resume_hopeStartMonth: req.body.user_resume_hopeStartMonth,
        user_resume_hopeStartDay: req.body.user_resume_hopeStartDay,
        user_resume_hopeWorkTime1Hour: req.body.user_resume_hopeWorkTime1Hour,
        user_resume_hopeWorkTime1Minute:
          req.body.user_resume_hopeWorkTime1Minute,
        user_resume_hopeWorkTime2Hour: req.body.user_resume_hopeWorkTime2Hour,
        user_resume_hopeWorkTime2Minute:
          req.body.user_resume_hopeWorkTime2Minute,
        IndividualId: req.user.id,
      },
      {
        where: { id: req.body.resumeId },
      }
    );

    await UserIndividual.update(
      {
        user_member_workType: req.body.workType,
      },
      {
        where: { IndividualId: req.user.id },
      }
    );
    res.status(201).json(changedResume);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/remove", isLoggedIn, async (req, res, next) => {
  try {
    const deletedResume = await UserResume.destroy({
      where: {
        id: req.body.id,
        IndividualId: req.user.id,
      },
    });
    if (deletedResume) {
      res.status(200).json({ ResumeId: parseInt(req.body.data, 10) });
    } else {
      res.status(404).json({ error: "Resume not found" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/", (req, res) => {});

module.exports = router;

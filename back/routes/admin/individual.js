const express = require("express");
const router = express.Router();
const { UserResume, UserCareer } = require("../../models");

router.post("/resume", async (req, res, next) => {
  try {
    const individualResume = await UserResume.findOne({
      where: {
        IndividualId: req.body.individualId,
      },
    });
    res.status(200).json(individualResume);
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/allResumes", async (req, res, next) => {
  try {
    const allResumes = await UserResume.findAll();
    res.status(200).json(allResumes);
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/career", async (req, res, next) => {
  try {
    const individualCareer = await UserCareer.findOne({
      where: {
        IndividualId: req.body.individualId,
      },
    });
    res.status(200).json(individualCareer);
  } catch (error) {
    console.error(error);
    next();
  }
});

module.exports = router;

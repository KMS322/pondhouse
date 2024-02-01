const express = require("express");
const { UserResume } = require("../models");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }
    const resumes = await UserResume.findAll({
      where: { IndividualId: req.user.id },
    });
    res.status(200).json(resumes);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;

const express = require("express");
const { BusinessRecruitment } = require("../models");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }
    const recruitments = await BusinessRecruitment.findAll({
      where: { BusinessId: req.user.id },
    });
    res.status(200).json(recruitments);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;

const express = require("express");
const router = express.Router();
const allUserRouter = require("./admin/allUser");
const individualRouter = require("./admin/individual");
const businessRouter = require("./admin/business");

router.use("/user", allUserRouter);
router.use("/individual", individualRouter);
router.use("/business", businessRouter);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  BusinessApplication,
  BusinessRecruitment,
  ConnectedIndividual,
} = require("../../models");
const { Op } = require("sequelize");

router.post("/application", async (req, res, next) => {
  try {
    const businessApplication = await BusinessApplication.findAll({
      where: {
        BusinessId: req.body.businessId,
      },
    });
    res.status(200).json(businessApplication);
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/allApplications", async (req, res, next) => {
  try {
    const allApplications = await BusinessApplication.findAll();
    res.status(200).json(allApplications);
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/appliedLists", async (req, res, next) => {
  try {
    const appliedLists = await BusinessApplication.findAll({
      where: { progressStep: { [Op.ne]: "목록신청전" } },
    });
    res.status(200).json(appliedLists);
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/matchingLists", async (req, res, next) => {
  try {
    const lists = await ConnectedIndividual.findAll({
      where: { BusinessId: req.body.businessId },
    });
    res.status(200).json(lists);
  } catch (error) {
    console.error(error);
    next();
  }
});

router.delete("/deleteList", async (req, res, next) => {
  try {
    const list = await ConnectedIndividual.update(
      {
        showOn: "off",
      },
      {
        where: { id: req.body.id },
      }
    );
    // const deleteLists = await ConnectedIndividual.destroy({
    //   where: {
    //     id: req.body.id,
    //   },
    // });
    await BusinessApplication.update(
      {
        individualCnt: req.body.newCnt,
      },
      {
        where: { BusinessId: Number(list.BusinessId) },
      }
    );
    res.status(200).send("deleted");
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/addList", async (req, res, next) => {
  try {
    const list = await ConnectedIndividual.update(
      {
        showOn: "on",
      },
      {
        where: { id: req.body.id },
      }
    );
    await BusinessApplication.update(
      {
        individualCnt: req.body.newCnt,
      },
      {
        where: { BusinessId: Number(list.BusinessId) },
      }
    );
    res.status(200).send("added");
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/recruitment", async (req, res, next) => {
  try {
    const businessRecruitment = await BusinessRecruitment.findOne({
      where: {
        BusinessId: req.body.businessId,
      },
    });
    res.status(200).json(businessRecruitment);
  } catch (error) {
    console.error(error);
    next();
  }
});

module.exports = router;

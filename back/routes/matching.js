const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");
const {
  User,
  UserIndividual,
  UserResume,
  UserBusiness,
  BusinessApplication,
  ConnectedIndividual,
  UserCareer,
} = require("../models");

router.post("/", async (req, res, next) => {
  try {
    const usersDB = await User.findAll({
      where: { userType: "individual" },
      include: [
        { model: UserIndividual },
        { model: UserResume },
        { model: UserCareer },
      ],
    });

    const users = usersDB.map((userInstance) => {
      const user = userInstance.toJSON();
      return {
        ...user,
        point: user.point || 0, // 기본값 설정
      };
    });
    const { businessId } = req.body.matchingData;
    const { applicationId } = req.body.matchingData;
    const businessDB = await UserBusiness.findOne({
      where: { BusinessId: businessId },
      // attributes: ["business_member_jibunAddress"],
    });
    const currentDate = dayjs().format("YYYY.MM.DD");

    const applicationDB = await BusinessApplication.findOne({
      where: { id: applicationId },
      // attributes: [
      //   "id",
      //   "business_application_startNow",
      //   "business_application_startYear",
      //   "business_application_startMonth",
      //   "business_application_startDay",
      //   "business_application_career",
      //   "business_application_careerMin",
      //   "business_application_careerMax",
      //   "business_application_workPlace",
      //   "business_application_rank1",
      //   "business_application_rank2",
      //   "business_application_rank3",
      //   "business_application_rank4",
      //   "individualCnt",
      //   "updatedAt",
      // ],
    });
    await BusinessApplication.update(
      { applyDay: currentDate },
      { where: { id: applicationId } }
    );

    const business = businessDB.toJSON();
    const application = applicationDB.toJSON();
    users.map((user) => {
      // 거주지 /////////////////////////////////////////////////////
      const businessAddress = business.business_member_jibunAddress.split(" ");
      const userAddress =
        user.UserIndividual.user_member_jibunAddress.split(" ");
      if (businessAddress[0] === userAddress[0]) {
        if (businessAddress[1] === userAddress[1]) {
          if (businessAddress[2] === userAddress[2]) {
            user.point +=
              10 * (5 - Number(application.business_application_rank4));
          } else {
            10 * (5 - Number(application.business_application_rank4)) - 5;
          }
        } else {
          user.point +=
            10 * (5 - Number(application.business_application_rank4)) - 10;
        }
      }

      // 근무타입 /////////////////////////////////////////////////////
      if (application.business_application_workPlace === "출근·재택 병행") {
        user.point += 10 * (5 - Number(application.business_application_rank3));
      } else if (
        application.business_application_workPlace ===
        "사업자 주소와 동일 (출근)"
      ) {
        if (
          user.UserIndividual.user_member_workType === "모두가능" ||
          user.UserIndividual.user_member_workType === "출퇴근"
        ) {
          user.point +=
            10 * (5 - Number(application.business_application_rank3));
        } else {
          user.point -= 100;
        }
      } else if (
        application.business_application_workPlace === "재택 근무 가능"
      ) {
        if (user.UserIndividual.user_member_workType === "재택") {
          user.point +=
            10 * (5 - Number(application.business_application_rank3));
        } else {
          user.point -= 100;
        }
      }

      // 경력 /////////////////////////////////////////////////////
      const businessCareer = application.business_application_career;
      const userCareer = Number(user.UserIndividual.user_member_career);
      const careerMin = Number(application.business_application_careerMin) * 12;
      const careerMax = Number(application.business_application_careerMax) * 12;
      if (businessCareer === "관계없음") {
        // user.point += 10 * (5 - Number(application.business_application_rank2));
        user.point += 0;
      } else if (businessCareer === "신입") {
        if (userCareer === 0) {
          // 경력 : 0년
          user.point +=
            10 * (5 - Number(application.business_application_rank2));
        } else if (userCareer < 12) {
          // 경력 : 1개월 이상 1년 미만
          user.point +=
            10 * (5 - Number(application.business_application_rank2)) - 5;
        } else if (userCareer >= 12 && userCareer <= 24) {
          // 경력 : 1년 ~ 2년
          user.point +=
            10 * (5 - Number(application.business_application_rank2)) - 10;
        } else if (userCareer >= 24 && userCareer <= 36) {
          // 경력 : 2~3년
          user.point +=
            10 * (5 - Number(application.business_application_rank2)) - 15;
        } else if (userCareer > 36) {
          // 경력 : 3년 초과
          user.point +=
            10 * (5 - Number(application.business_application_rank2)) - 20;
        }
      } else if (businessCareer !== "신입" && businessCareer !== "관계없음") {
        if (userCareer >= careerMin && userCareer <= careerMax) {
          user.point +=
            10 * (5 - Number(application.business_application_rank2));
        } else if (userCareer < careerMin) {
          if (Math.abs(careerMin - userCareer) <= 12) {
            user.point +=
              10 * (5 - Number(application.business_application_rank2)) - 5;
          } else if (
            Math.abs(careerMin - userCareer) > 12 &&
            Math.abs(careerMin - userCareer) <= 24
          ) {
            user.point +=
              10 * (5 - Number(application.business_application_rank2)) - 10;
          } else {
            user.point +=
              10 * (5 - Number(application.business_application_rank2)) - 15;
          }
        } else {
          if (Math.abs(userCareer - careerMax) <= 12) {
            user.point +=
              10 * (5 - Number(application.business_application_rank2)) - 5;
          } else if (
            Math.abs(userCareer - careerMax) > 12 &&
            Math.abs(userCareer - careerMax) <= 24
          ) {
            user.point +=
              10 * (5 - Number(application.business_application_rank2)) - 10;
          } else if (Math.abs(userCareer - careerMax) > 24) {
            user.point +=
              10 * (5 - Number(application.business_application_rank2)) - 15;
          }
        }
      }
      // 근무 시작 시기 /////////////////////////////////////////////////////
      function parseDate(yyyyMMdd) {
        const year = parseInt(yyyyMMdd.substring(0, 4), 10);
        const month = parseInt(yyyyMMdd.substring(4, 6), 10) - 1;
        const day = parseInt(yyyyMMdd.substring(6, 8), 10);

        return new Date(year, month, day);
      }
      function calculateDateDifference(dateStringA, dateStringB) {
        const dateA = parseDate(dateStringA);
        const dateB = parseDate(dateStringB);

        const timeDiff = dateB.getTime() - dateA.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        return daysDiff;
      }

      const userStart =
        user.UserResumes[0].user_resume_hopeStartYear +
        user.UserResumes[0].user_resume_hopeStartMonth +
        user.UserResumes[0].user_resume_hopeStartDay;
      let businessStart;
      if (application.business_application_startNow) {
        businessStart = dayjs(application.updatedAt).format("YYYYMMDD");
      } else {
        businessStart =
          application.business_application_startYear +
          application.business_application_startMonth +
          application.business_application_startDay;
      }

      if (Number(businessStart) >= Number(userStart)) {
        user.point += 10 * (5 - Number(application.business_application_rank1));
      } else if (Number(businessStart) < Number(userStart)) {
        const startGap = calculateDateDifference(businessStart, userStart);
        if (startGap < 3) {
          user.point +=
            10 * (5 - Number(application.business_application_rank1)) - 2;
        } else if (startGap < 7) {
          user.point +=
            10 * (5 - Number(application.business_application_rank1)) - 4;
        } else if (startGap < 10) {
          user.point +=
            10 * (5 - Number(application.business_application_rank1)) - 6;
        } else if (startGap < 15) {
          user.point +=
            10 * (5 - Number(application.business_application_rank1)) - 8;
        } else if (startGap < 30) {
          user.point +=
            10 * (5 - Number(application.business_application_rank1)) - 10;
        } else if (startGap < 60) {
          user.point +=
            10 * (5 - Number(application.business_application_rank1)) - 15;
        } else {
          user.point +=
            10 * (5 - Number(application.business_application_rank1)) - 20;
        }
      }
    });

    const sortedUsers = users.sort((a, b) => b.point - a.point);

    const userCnt = Number(application.individualCnt);
    const top15Users = sortedUsers.slice(0, 15);
    const exConnect = await ConnectedIndividual.findAll({
      where: { ApplicationId: application.id },
    });
    if (exConnect.length === 0) {
      for (const user of top15Users) {
        await ConnectedIndividual.create({
          point: String(user.point),
          concurrence: "대기",
          IndividualId: String(user.UserIndividual.IndividualId),
          BusinessId: businessId,
          ApplicationId: application.id,
        });
      }
    }
    // const connectArr = exConnect.toJSON();
    // const top5Users = exConnect.slice(0, userCnt);
    const jsonUsers = exConnect.map((connect) => connect.dataValues);
    const jsonsortedUsers = jsonUsers
      .sort((a, b) => b.point - a.point)
      .slice(0, 15);
    const matchedUsers = users.filter((user) =>
      jsonsortedUsers.some(
        (jsonUser) => user.id === Number(jsonUser.IndividualId)
      )
    );
    const jsonsortedUsers1 = jsonUsers
      .sort((a, b) => b.point - a.point)
      .slice(0, userCnt);
    const matchedUsers1 = users.filter((user) =>
      jsonsortedUsers1.some(
        (jsonUser) => user.id === Number(jsonUser.IndividualId)
      )
    );
    for (const matchedUser of matchedUsers1) {
      await ConnectedIndividual.update(
        {
          showOn: "on",
        },
        {
          where: { IndividualId: String(matchedUser.id), showOn: null },
        }
      );
    }
    // await ConnectedIndividual.destroy({
    //   where: { ApplicationId: application.id },
    // });
    // for (const user of top50Users) {
    //   await ConnectedIndividual.create({
    //     point: String(user.point),
    //     concurrence: "대기",
    //     IndividualId: String(user.UserIndividual.IndividualId),
    //     BusinessId: businessId,
    //     ApplicationId: application.id,
    //   });
    // }

    res.status(200).json(matchedUsers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/connect", async (req, res, next) => {
  try {
    const { id } = req.user.dataValues;
    const connectedCompanies = await ConnectedIndividual.findOne({
      where: { IndividualId: id },
      attributes: ["BusinessId", "concurrence"],
    });
    const businessId = connectedCompanies.BusinessId;
    const businessInfo = await UserBusiness.findOne({
      where: { BusinessId: businessId },
    });
    const applicationInfo = await BusinessApplication.findOne({
      where: { BusinessId: businessId },
    });
    const responseData = {
      businessInfo: businessInfo,
      applicationInfo: applicationInfo,
      connectedInfo: connectedCompanies,
    };
    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/concurrence", async (req, res, next) => {
  try {
    const { id } = req.user.dataValues;

    await ConnectedIndividual.update(
      {
        concurrence: req.body.agreement,
      },
      {
        where: { IndividualId: id },
      }
    );
    res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/changeStep", async (req, res, next) => {
  try {
    const { id } = req.user.dataValues;
    if (req.body.step === "동의여부조사중") {
      setTimeout(async () => {
        await BusinessApplication.update(
          {
            progressStep: "조사완료",
          },
          {
            where: { BusinessId: id },
          }
        );
      }, 1000);
    }
    await BusinessApplication.update(
      {
        progressStep: req.body.step,
      },
      {
        where: { BusinessId: id },
      }
    );
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/loadConcurrence", async (req, res, next) => {
  try {
    const arr = req.body.arr;
    let sendConcurrence = [];
    for (const id of arr) {
      const object = await ConnectedIndividual.findOne({
        where: { IndividualId: Number(id) },
        attributes: ["IndividualId", "concurrence", "showOn"],
      });
      if (object) {
        const newObject = {
          IndividualId: object.IndividualId,
          concurrence: object.concurrence,
          showOn: object.showOn,
        };
        sendConcurrence.push(newObject);
      }
    }
    res.status(200).json(sendConcurrence);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/clickPay", async (req, res, next) => {
  try {
    await UserBusiness.update(
      {
        business_member_pay: req.body.pay,
      },
      {
        where: { BusinessId: Number(req.body.businessId) },
      }
    );
    res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    next();
  }
});
module.exports = router;

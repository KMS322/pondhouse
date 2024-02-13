const express = require("express");
const router = express.Router();
const axios = require("axios");
const KAKAO_API_URL = "https://kapi.kakao.com/v2/api/talk/memo/default/send";
const KAKAO_API_TOKEN =
  "Q2x6RtCzrjfOsehyDULlSmXYMMTTiPTwn11_HVZCR2zfyBbpmPqiuzbQUIgKPXUaAAABjaGulcMe0jm_MNo9Pw";
router.post("/", async (req, res, next) => {
  try {
    const response = await axios.post(
      KAKAO_API_URL,
      {
        template_object: {
          object_type: "text",
          //   text: `<html><body>
          // <p>이름 : ${req.body.name}</p>
          // <p>전화번호 : ${req.body.tel}</p>
          // <p>예식날짜 : ${req.body.day}</p>
          // <p>예식시간 : ${req.body.time} ${req.body.selectedTime} </p>
          // <p>예식장 위치 : ${req.body.location}</p>
          // <p>상담내용 : ${req.body.content}</p>
          // </body></html>`,
          text: "aaaa",
          link: {},
        },
      },
      {
        headers: {
          Authorization: `Bearer ${KAKAO_API_TOKEN}`,
        },
      }
    );

    console.log("Kakao API Response:", response.data);

    res.status(200).send("Message sent successfully");
  } catch (error) {
    console.error(error);
    next();
  }
});

module.exports = router;

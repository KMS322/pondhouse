const express = require("express");
const router = express.Router();
const qs = require("qs");
const axios = require("axios");
const api_host = "https://kapi.kakao.com";
const { Kakao } = require("../models");
const API_URL = "http://localhost:3060";
const token_uri = "https://kauth.kakao.com/oauth/token";
const client_secret = "";

router.post("/load", async (req, res, next) => {
  try {
    const kakao = await Kakao.findOne({
      attributes: ["id"],
      where: {
        id: 1,
      },
    });
    res.status(200).json(kakao);
  } catch (error) {
    console.error(error);
    next();
  }
});

router.get("/authorize", async (req, res, next) => {
  try {
    const findKakao = await Kakao.findOne({
      where: {
        id: 1,
      },
    });
    if (!findKakao) {
      const newKakao = await Kakao.create({});
      let { scope } = req.query;
      let scopeParam = "";
      if (scope) {
        scopeParam = "&scope=" + scope;
      }
      res
        .status(302)
        .redirect(
          `https://kauth.kakao.com/oauth/authorize?client_id=${newKakao.restApiKey}&redirect_uri=${API_URL}/kakao/redirect&response_type=code${scopeParam}`
        );
    } else {
      let { scope } = req.query;
      let scopeParam = "";
      if (scope) {
        scopeParam = "&scope=" + scope;
      }
      res
        .status(302)
        .redirect(
          `https://kauth.kakao.com/oauth/authorize?client_id=${findKakao.restApiKey}&redirect_uri=${API_URL}/kakao/redirect&response_type=code${scopeParam}`
        );
    }
  } catch (error) {
    console.error(error);
    next();
  }
});

async function call(method, uri, param, header) {
  try {
    rtn = await axios({
      method: method,
      url: uri,
      headers: header,
      data: param,
    });
  } catch (err) {
    rtn = err.response;
  }
  return rtn.data;
}

router.get("/redirect", async function (req, res) {
  const kakao = await Kakao.findOne({
    where: {
      id: 1,
    },
  });
  const param = qs.stringify({
    grant_type: "authorization_code",
    client_id: kakao.restApiKey,
    redirect_uri: `${API_URL}/kakao/redirect`,
    client_secret: client_secret,
    code: req.query.code,
  });
  const header = { "content-type": "application/x-www-form-urlencoded" };
  var rtn = await call("POST", token_uri, param, header);
  await Kakao.update(
    {
      accessToken: rtn.access_token,
    },
    {
      where: {
        id: 1,
      },
    }
  );
  const API_URL_WITHOUT_PORT = API_URL.substring(0, API_URL.lastIndexOf(":"));
  res.status(302).redirect(`${API_URL_WITHOUT_PORT}/admin`);
});

router.post("/message", async (req, res, next) => {
  try {
    const kakao = await Kakao.findOne({
      where: {
        id: 1,
      },
    });
    const uri = api_host + "/v2/api/talk/memo/default/send";
    const message = `이름 : ${req.body.name}\n전화번호 : ${req.body.tel}\n예식 날짜 : ${req.body.day}\n예식 시간 : ${req.body.selectedTime} ${req.body.time}\n예식장 위치 : ${req.body.location}\n상담내용 : ${req.body.content}`;
    console.log("message : ", message);
    const param = qs.stringify({
      template_object: JSON.stringify({
        object_type: "text",
        text: message,
        link: {
          web_url: "https://developers.kakao.com",
          mobile_web_url: "https://developers.kakao.com",
        },
        button_title: "메일 확인",
      }),
    });
    const header = {
      "content-Type": "application/x-www-form-urlencoded",
      Authorization: "Bearer " + kakao.accessToken,
    };
    const rtn = await call("POST", uri, param, header);
    console.log("rtn : ", rtn);
    res.send(rtn);
  } catch (error) {
    console.error(error);
    next();
  }
});

module.exports = router;

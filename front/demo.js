const express = require("express");
const session = require("express-session");
const cors = require("cors");
const qs = require("qs");
const axios = require("axios");
const app = express();
const port = 4000;
const client_id = "b5f7d20ab71488c958847f02fe66c821";
const redirect_uri = "http://localhost:4000/redirect";
const token_uri = "https://kauth.kakao.com/oauth/token";
const api_host = "https://kapi.kakao.com";
const client_secret = "";
const origin = "http://localhost";
const message = "aaaabkajsdl";
app.use(
  session({
    secret: "your session secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
let corsOptions = {
  origin: origin,
  credentials: true,
};
app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.send("ok");
});
app.get("/authorize", function (req, res) {
  let { scope } = req.query;
  let scopeParam = "";
  if (scope) {
    scopeParam = "&scope=" + scope;
  }
  res
    .status(302)
    .redirect(
      `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code${scopeParam}`
    );
});

// app.get("/gain", async (req, res) => {
//   try {
//     axios
//       .get(
//         "https://kauth.kakao.com/oauth/authorize?client_id=b5f7d20ab71488c958847f02fe66c821&redirect_uri=http://localhost:4000/redirect&response_type=code&scope=talk_message"
//       )
//       .then((data) => {
//         console.log("data : ", data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   } catch (error) {
//     console.error(error);
//     next();
//   }
// });

async function call(method, uri, param, header) {
  console.log("method : ", method);
  console.log("uri : ", uri);
  console.log("param : ", param);
  console.log("header : ", header);
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
  console.log("rtn.data : ", rtn.data);
  return rtn.data;
}
let code = "";
app.get("/redirect", async function (req, res) {
  code = req.query.code;
  const param = qs.stringify({
    grant_type: "authorization_code",
    client_id: client_id,
    redirect_uri: redirect_uri,
    client_secret: client_secret,
    code: req.query.code,
  });
  const header = { "content-type": "application/x-www-form-urlencoded" };
  var rtn = await call("POST", token_uri, param, header);
  console.log("rtn.access_token : ", rtn.access_token);
  req.session.key = rtn.access_token;
  res.status(302).redirect(`${origin}/demo.html`);
});

app.get("/message", async function (req, res) {
  const uri = api_host + "/v2/api/talk/memo/default/send";
  const param = qs.stringify({
    template_object: `{
      "object_type": "text",
      "text": "${message}1",
      "link": {
          "web_url": "https://developers.kakao.com",
          "mobile_web_url": "https://developers.kakao.com"
      },
      "button_title": "바로 확인"
    }`,
  });
  const header = {
    "content-Type": "application/x-www-form-urlencoded",
    // Authorization: "Bearer " + req.session.key,
    Authorization:
      "Bearer " +
      "HfeUu4eDSRJ5rS5P64LTJ0mEDs5PLvgUYCUKPXRoAAABjaYFIjjgLMgnBn6ZSw",
  };
  const rtn = await call("POST", uri, param, header);
  res.send(rtn);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

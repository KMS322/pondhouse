const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const resumeRouter = require("./routes/userResume");
const resumesRouter = require("./routes/resumes");
const careerRouter = require("./routes/userCareer");
const careersRouter = require("./routes/careers");
const businessRouter = require("./routes/business");
const applicationRouter = require("./routes/businessApplication");
const applicationsRouter = require("./routes/applications");
const recruitmentRouter = require("./routes/businessRecruitment");
const recruitmentsRouter = require("./routes/recruitments");
const userInfoRouter = require("./routes/userInfo");
const adminRouter = require("./routes/admin");
const testRouter = require("./routes/test");
const matchingRouter = require("./routes/matching");
const db = require("./models");
const passportConfig = require("./passport");

dotenv.config();
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.err);

passportConfig();

// if (process.env.NODE_ENV === "production") {
//   app.use(morgan("combined"));
//   app.use(hpp());
//   app.use(helmet());
// } else {
//   app.use(morgan("dev"));
// }
// npm i pm2 cross-env helmet hpp
// (package.json) "cross-env NODE_ENV=production pm2 start app"

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost",
      // "http://52.78.107.42",
      "http://www.accydream.com",
      "http://www.accydream.com:3000",
      // "http://13.209.104.234.com",
      // "http://13.209.104.234:3000",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("server on");
});

app.use("/user", userRouter);
app.use("/resume", resumeRouter);
app.use("/resumes", resumesRouter);
app.use("/career", careerRouter);
app.use("/careers", careersRouter);
app.use("/business", businessRouter);
app.use("/application", applicationRouter);
app.use("/applications", applicationsRouter);
app.use("/recruitment", recruitmentRouter);
app.use("/recruitments", recruitmentsRouter);
app.use("/userInfo", userInfoRouter);
app.use("/admin", adminRouter);
app.use("/test", testRouter);
app.use("/matching", matchingRouter);
// app.use((err, req, res, next) => {
//   // 에러 처리 미들웨어
// });
const port = 3060;
app.listen(port, () => {
  console.log(`${port}에서 서버 실행 중`);
});

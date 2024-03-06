const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const listRouter = require("./routes/list");
const contactRouter = require("./routes/contact");
const db = require("./models");

dotenv.config();
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db connected");
  })
  .catch(console.err);

app.use(
  cors({
    origin: [
      "http://localhost",
      "http://pondhouse.kr",
      "http://211.110.229.108",
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

app.get("/", (req, res) => {
  res.send("server on");
});

app.use("/user", userRouter);
app.use("/list", listRouter);
app.use("/contact", contactRouter);

const port = 3060;
app.listen(port, () => {
  console.log(`${port}에서 서버 실행 중`);
});

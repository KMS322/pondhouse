const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const listRouter = require("./routes/list");
const contactRouter = require("./routes/contact");
const popupRouter = require("./routes/popup");
const db = require("./models");
const passportConfig = require("./passport");

dotenv.config();
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db connected");
  })
  .catch(console.err);

passportConfig();

app.use(
  cors({
    origin: ["http://localhost", "http://pondhouse.kr"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get("/", (req, res) => {
  res.send("server on");
});

app.use("/user", userRouter);
app.use("/list", listRouter);
app.use("/contact", contactRouter);
app.use("/popup", popupRouter);

const port = 3060;
app.listen(port, () => {
  console.log(`server on ${port}`);
});

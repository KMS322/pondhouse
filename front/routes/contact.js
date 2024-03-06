const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res, next) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 25,
      secure: false,
      auth: {
        // user: "sooljoo94@gmail.com",
        // pass: "ancdsehxwluuoili",
        user: "creamoff2021@gmail.com",
        pass: "ktdldgctfcczdfmy",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: req.body.name,
      // to: "studioofrog@gmail.com",
      to: "kms930322@naver.com",
      subject: `PONDHOUSE WEB CONTACT By ${req.body.name}`,
      html: `<html><body>
      <p>이름 : ${req.body.name}</p>
      <p>전화번호 : ${req.body.tel}</p>
      <p>예식날짜 : ${req.body.day}</p>
      <p>예식시간 : ${req.body.time} ${req.body.selectedTime} </p>
      <p>예식장 위치 : ${req.body.location}</p>
      <p>상담내용 : ${req.body.content}</p>
      </body></html>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Email Send " + info.response);
        res.status(200).send("Email sended");
      }
    });
  } catch (error) {
    console.error(error);
    next();
  }
});

module.exports = router;

const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const { VideoList } = require("../models");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // 이 부분을 확인
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    const { filename: file_name } = req.file;
    const { title: file_title } = req.body;
    await VideoList.create({
      file_name,
      file_title,
    });
    res.status(201).send("Upload successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

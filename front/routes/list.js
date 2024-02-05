const express = require("express");
const multer = require("multer");
const router = express.Router();
const { VideoList } = require("../models");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/videos/");
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    cb(null, decodeURIComponent(originalName));
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    const { originalname: file_name } = req.file;
    const decodeFileName = decodeURIComponent(file_name);
    const { title: file_title } = req.body;
    await VideoList.create({
      file_name: decodeFileName,
      file_title,
    });
    res.status(201).send(`${decodeFileName} 등록 완료`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/load", async (req, res, next) => {
  try {
    const fileDatas = await VideoList.findAll({});

    res.status(200).json(fileDatas);
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/delete", async (req, res, next) => {
  try {
    const deletedData = await VideoList.destroy({
      where: { id: req.body.id },
    });
    const filePath = path.join(
      __dirname,
      "..",
      "public",
      "videos",
      `${req.body.fileName}`
    );
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return res.status(500).send("Internal Server Error");
      }
      console.log("File deleted successfully");
      const deletedId = req.body.id;
      res.status(200).json({ id: deletedId });
    });
  } catch (error) {
    console.error(error);
    next();
  }
});
module.exports = router;

const express = require("express");
const multer = require("multer");
const router = express.Router();
const { VideoList } = require("../models");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const axios = require("axios");
// const puppeteer = require("puppeteer");

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

const getVideoTitle = async (videoId) => {
  try {
    const response = await axios.get(
      `https://www.youtube.com/watch?v=${videoId}`
    );
    const $ = cheerio.load(response.data);
    const title = $('meta[property="og:title"]').attr("content");
    return title;
  } catch (error) {
    console.error("Error fetching video title:", error);
    return null;
  }
};

// const getVideoTitleWithPuppeteer = async (videoId) => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // YouTube 동영상 페이지 열기
//   await page.goto(`https://www.youtube.com/watch?v=${videoId}`);

//   // 동영상 제목 가져오기
//   const title = await page.$eval('meta[property="og:title"]', (element) => element.getAttribute('content'));

//   await browser.close();

//   return title;
// };

router.post("/add", async (req, res, next) => {
  try {
    for (let i = 0; i < req.body.length; i++) {
      videoId = req.body[i].match(/[?&]v=([^&]+)/)[1];
      let videoTitle;
      try {
        videoTitle = await getVideoTitle(videoId);
      } catch (error) {
        console.error("Error: ", error);
      }
      await VideoList.create({
        file_id: videoId,
        file_title: videoTitle,
        file_url: req.body[i],
      });
    }
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

const express = require("express");
const multer = require("multer");
const router = express.Router();
const { VideoList } = require("../models");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const axios = require("axios");

const folderPath = path.join(__dirname, "..", "public", "thumbnails");
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}
const Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/thumbnails/");
  },
  filename: function (req, file, callback) {
    const fileName = file.originalname;
    const decodedFileName = decodeURIComponent(file.originalname);
    const filePath = "public/thumbnails/" + fileName;

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    callback(null, decodedFileName);
  },
});

const upload = multer({ storage: Storage });

router.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    const { originalname: file_name } = req.file;
    const decodeFileName = decodeURIComponent(file_name);
    console.log("file_name : ", file_name);
    console.log("decodeFileName : ", decodeFileName);

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

router.post("/add", async (req, res, next) => {
  try {
    for (let i = 0; i < req.body.urls.length; i++) {
      videoId = req.body.urls[i].match(/[?&]v=([^&]+)/)[1];
      let videoTitle;
      try {
        videoTitle = await getVideoTitle(videoId);
      } catch (error) {
        console.error("Error: ", error);
      }
      const videoLists = await VideoList.findAll();
      const maxLength = videoLists.length;
      await VideoList.create({
        file_id: videoId,
        file_title: videoTitle,
        file_url: req.body.urls[i],
        thumbnail_src: req.body.thumbnailSrcs[i],
        order: maxLength + 1,
      });
    }
    res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/change", async (req, res, next) => {
  try {
    for (const list of req.body.videoLists) {
      await VideoList.update(
        { order: list.order },
        { where: { file_url: list.file_url } }
      );
    }
    res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/delete", async (req, res, next) => {
  try {
    const exData = await VideoList.findAll({
      where: { thumbnail_src: req.body.src },
    });
    const deletedData = await VideoList.destroy({
      where: { id: req.body.id },
    });
    const filePath = path.join(
      __dirname,
      "..",
      "public",
      "thumbnails",
      `${req.body.src}`
    );
    const deletedId = req.body.id;
    if (req.body.src) {
      if (exData.length > 1) {
        res.status(200).json({ id: deletedId });
      } else {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
            return res.status(500).send("Internal Server Error");
          }
          console.log("File deleted successfully");
          res.status(200).json({ id: deletedId });
        });
      }
    }
    res.status(200).send("deleted");
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/update", async (req, res, next) => {
  try {
    const allLists = await VideoList.findAll({});
    for (const list of allLists) {
      const videoId = list.file_url.match(/[?&]v=([^&]+)/)[1];
      let videoTitle;
      try {
        videoTitle = await getVideoTitle(videoId);
      } catch (error) {
        console.error("Error: ", error);
      }

      await VideoList.update(
        {
          file_title: videoTitle,
        },
        {
          where: { id: list.id },
        }
      );
    }
    res.status(200).json();
  } catch (error) {
    console.error(error);
    next();
  }
});

module.exports = router;

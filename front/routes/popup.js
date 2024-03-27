const express = require("express");
const router = express.Router();
const { Popup } = require("../models");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/popups/");
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

    res.status(201).send(`${decodeFileName} 등록 완료`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const prev = await Popup.findOne({ where: {} });

    if (prev) {
      const jsonPrev = prev.toJSON();
      console.log("jsonPrev : ", jsonPrev);
      const imgSrc = jsonPrev.img_src;

      if (imgSrc) {
        const filePath = path.join(__dirname, "..", "public", "popups", imgSrc);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          } else {
            console.log("File deleted successfully : ", jsonPrev.img_src);
          }
        });
      }
    }
    await Popup.destroy({ where: {} });

    const added = await Popup.create({
      img_src: req.body.selectedFileName,
      active: "off",
    });
    res.status(200).send("added.img_src");
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/load", async (req, res, next) => {
  try {
    const popup = await Popup.findOne();
    res.status(200).json(popup);
  } catch (error) {
    console.error(error);
    next();
  }
});

router.post("/active", async (req, res, next) => {
  try {
    await Popup.update(
      {
        active: req.body.active,
      },
      { where: {} }
    );
    res.status(200).send("updated");
  } catch (error) {
    console.error(error);
    next();
  }
});

module.exports = router;

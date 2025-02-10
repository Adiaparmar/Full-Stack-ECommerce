const { Banner } = require("../models/banner");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/banners"); // Save banner images in a separate folder
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// 📌 Upload Banner Image API
router.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }
  res.json({ image: req.file.filename });
});

// 📌 Create a New Banner
router.post("/", async (req, res) => {
  const banner = new Banner({
    name: req.body.name,
    image: req.body.image, // Image should be sent as a string (filename)
  });

  try {
    const savedBanner = await banner.save();
    res.status(201).json(savedBanner);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create banner" });
  }
});

// 📌 Get All Banners
router.get("/", async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch banners" });
  }
});

// 📌 Delete a Banner
router.delete("/:id", async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    // Remove image file
    if (banner.image) {
      fs.unlinkSync(`uploads/banners/${banner.image}`);
    }

    await Banner.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Banner deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete banner" });
  }
});

module.exports = router;

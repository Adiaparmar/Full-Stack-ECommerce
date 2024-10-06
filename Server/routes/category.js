const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const pLimit = require("p-limit");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// get all categories

router.get("/", async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }

  res.send(categoryList);
});

// get category by id

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res
      .status(500)
      .json({ message: "The category with the given id was not found." });
  }
  return res.status(200).send(category);
});

// create category

router.post("/create", async (req, res) => {
  const limit = pLimit(2);

  const imagesToUpload = req.body.images.map((image) => {
    return limit(async () => {
      const result = await cloudinary.uploader.upload(image);
      // console.log(`Successfully uploaded ${image} `);
      //console.log(`>Result: ${result.secure_url}`);
      return result;
    });
  });

  const uploadStatus = await Promise.all(imagesToUpload);

  const imgurl = uploadStatus.map((item) => {
    return item.secure_url;
  });

  if (!uploadStatus) {
    return res.status(500).json({
      error: "images cannot be uploaded",
      status: false,
    });
  }

  let category = new Category({
    name: req.body.name,
    images: imgurl,
    color: req.body.color,
  });

  if (!category) {
    res.status(500).json({
      error: err,
      success: false,
    });
  }

  category = await category.save();
  res.status(201).json(category);
});

// delete a category
router.delete("/:id", async (req, res) => {
  const deletedCategory = await Category.findByIdAndDelete(req.params.id);

  if (!deletedCategory) {
    res.status(404).json({
      message: "Category not found",
      success: false,
    });
  }

  res.status(200).json({
    success: true,
    message: "Category is deleted",
  });
});

router.put("/:id", async (req, res) => {
  const limit = pLimit(2);

  const imagesToUpload = req.body.images.map((image) => {
    return limit(async () => {
      const result = await cloudinary.uploader.upload(image);
      //console.log(`Successfully uploaded ${image} `);
      //console.log(`>Result: ${result.secure_url}`);
      return result;
    });
  });

  const uploadStatus = await Promise.all(imagesToUpload);

  const imgurl = uploadStatus.map((item) => {
    return item.secure_url;
  });

  if (!uploadStatus) {
    return res.status(500).json({
      error: "images cannot be uploaded",
      status: false,
    });
  }

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      images: imgurl,
      color: req.body.color,
    },
    { new: true }
  );

  if (!category) {
    return res.status(500).json({
      message: "Category cannot be updated!",
      success: false,
    });
  }

  res.send(category);
});

module.exports = router;

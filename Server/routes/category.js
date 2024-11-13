const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

const multer = require("multer");
const fs = require("fs");

var imagesArr = [];
var categoryEditId;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.array("images"), async (req, res) => {
  // if (categoryEditId !== undefined) {
  //   const category = await Category.findById(categoryEditId);
  //   const images = category.images;

  //   if (images.length !== 0) {
  //     for (image of images) {
  //       fs.unlinkSync(`uploads/${image}`);
  //     }
  //   }
  // }
  imagesArr = [];
  const files = req.files;

  for (let i = 0; i < files.length; i++) {
    imagesArr.push(files[i].filename);
  }
  res.send(imagesArr);
});

// get all categories

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const totalPosts = await Category.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return res.status(404).json({ message: "Page not found" });
    }

    const categoryList = await Category.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!categoryList) {
      res.status(500).json({ success: false });
    }

    return res.status(200).json({
      categoryList: categoryList,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// get category by id

router.get("/:id", async (req, res) => {
  categoryEditId = req.params.id;
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
  let category = new Category({
    name: req.body.name,
    images: imagesArr,
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
  const category = await Category.findById(req.params.id);
  const images = category.images;

  if (images.length !== 0) {
    for (image of images) {
      fs.unlinkSync(`uploads/${image}`);
    }
  }
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

router.put("/:id", upload.array("images"), async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      images: imagesArr,
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

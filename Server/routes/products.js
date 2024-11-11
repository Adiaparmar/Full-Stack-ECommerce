const { Category } = require("../models/category");
const { Product } = require("../models/products");
const express = require("express");
const router = express.Router();

const multer = require("multer");
const fs = require("fs");

var imagesArr = [];
var productEditId;

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
  imagesArr = [];
  const files = req.files;

  for (let i = 0; i < files.length; i++) {
    imagesArr.push(files[i].filename);
  }

  res.send({ imagesArr });
});

// get all products
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = 100;
  const totalPosts = await Product.countDocuments();
  const totalPages = Math.ceil(totalPosts / perPage);

  if (page < 1 || page > totalPages) {
    return res.status(404).json({ message: "Page not found" });
  }

  const productList = await Product.find()
    .populate("category")
    .skip((page - 1) * perPage)
    .limit(perPage)
    .exec();

  if (!productList) {
    res.status(500).json({ success: false });
  }

  return res.status(200).json({
    products: productList,
    totalPages: totalPages,
    currentPage: page,
  });
});

// create a product
router.post("/create", async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).send("Invalid Category");
  }

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    images: imagesArr,
    brand: req.body.brand,
    price: req.body.price,
    oldPrice: req.body.oldPrice,
    category: req.body.category,
    subCat: req.body.subCat,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    isFeatured: req.body.isFeatured,
  });

  product = await product.save();
  if (!product) {
    res.status(500).json({
      error: err,
      success: false,
    });
  }

  res.status(200).json(product);
});

// Get Product by id
router.get("/:id", async (req, res) => {
  productEditId = req.params.id;

  const product = await Product.findById(req.params.id);
  if (!product) {
    res
      .status(500)
      .json({ message: "The product with the given id was not found." });
  }
  return res.status(200).send(product);
});

// Delete a Product
router.delete("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  const images = product.images;

  if (images.length !== 0) {
    for (image of images) {
      fs.unlinkSync(`uploads/${image}`);
    }
  }
  const deleteProduct = await Product.findByIdAndDelete(req.params.id);
  if (!deleteProduct) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  res.status(200).json({ success: true, message: "Product is deleted" });
});

//Update a Product
router.put("/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      images: imagesArr,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      // subCat: req.body.subCat,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  );

  if (!product) {
    res.status(404).json({
      message: "The product can not be updated",
      status: false,
    });
  }
  res.status(200).json({
    message: "The product is updated",
    status: true,
  });
});

module.exports = router;

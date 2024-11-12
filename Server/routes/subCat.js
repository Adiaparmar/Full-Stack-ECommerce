const { SubCategory } = require("../models/subCat");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const subCat = await SubCategory.find().populate("category");

    if (!subCat) {
      res.status(500).json({ success: false });
    }
    return res.status(200).json(subCat);
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

//get by id
router.get("/:id", async (req, res) => {
  const subCat = await SubCategory.findById(req.params.id).populate("category");
  if (!subCat) {
    res
      .status(500)
      .json({ message: "The sub category with the given id was not found." });
  }
  return res.status(200).send(subCat);
});

// crete sub category
router.post("/create", async (req, res) => {
  let subCat = new SubCategory({
    category: req.body.category,
    subCat: req.body.subCat,
  });

  if (!subCat) {
    res.status(500).json({
      error: err,
      success: false,
    });
  }

  subCat = await subCat.save();
  res.status(201).json(subCat);
});

// delete a sub category
router.delete("/:id", async (req, res) => {
  const deletedSubCat = await SubCategory.findByIdAndDelete(req.params.id);

  if (!deletedSubCat) {
    res.status(404).json({
      message: "Sub Category not found",
      success: false,
    });
  }

  res.status(200).json({
    success: true,
    message: "Sub Category is deleted",
  });
});

//update sub category
router.put("/:id", async (req, res) => {
  const subCat = await SubCategory.findByIdAndUpdate(
    req.params.id,
    {
      category: req.body.category,
      subCat: req.body.subCat,
    },
    { new: true }
  );

  if (!subCat) {
    return res.status(500).json({
      message: "Sub Category cannot be updated!",
      success: false,
    });
  }

  res.send(subCat);
});

module.exports = router;

const { Cart } = require("../models/cart");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cartList = await Cart.find(req.query);
    if (!cartList) {
      res.status(500).json({ success: false });
    }
    return res.status(200).json(cartList);
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

router.post("/add", async (req, res) => {
  const cartItem = await Cart.find({ productId: req.body.productId });
  if (cartItem.length === 0) {
    let cartList = new Cart({
      productTitle: req.body.productTitle,
      image: req.body.image,
      rating: req.body.rating,
      price: req.body.price,
      quantity: req.body.quantity,
      subTotal: req.body.subTotal,
      productId: req.body.productId,
      userId: req.body.userId,
    });

    if (!cartList) {
      res.status(500).json({ error: err, success: false });
    }

    cartList = await cartList.save();
    res.status(201).json(cartList);
  } else {
    res.status(401).json({ message: "Cart item already exists" });
  }
});

router.delete("/:id", async (req, res) => {
  const cartItem = await Cart.findById(req.params.id);
  if (!cartItem) {
    res.status(404).json({ msg: "The cart item given id is not found" });
  }

  const deletedItem = await Cart.findByIdAndDelete(req.params.id);

  if (!deletedItem) {
    res.status(404).json({
      message: "Card item not found",
      success: false,
    });
  }

  res.status(200).json({
    success: true,
    message: "Cart item is deleted",
  });
});

router.get("/:id", async (req, res) => {
  const cartItem = await Cart.findById(req.params.id);
  if (!cartItem) {
    res.status(404).json({ msg: "The cart item given id is not found" });
  }
  return res.status(200).send(cartItem);
});

router.put("/:id", async (req, res) => {
  const cartList = await Cart.findByIdAndUpdate(
    req.params.id,
    {
      productTitle: req.body.productTitle,
      image: req.body.image,
      rating: req.body.rating,
      price: req.body.price,
      quantity: req.body.quantity,
      subTotal: req.body.subTotal,
      productId: req.body.productId,
      userId: req.body.userId,
    },
    { new: true }
  );
  if (!cartList) {
    return res.status(500).json({
      message: "Cart item cannot be updated",
      success: false,
    });
  }

  res.send(cartList);
});

module.exports = router;

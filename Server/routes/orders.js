const { Order } = require("../models/orders");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 100;
    const totalPosts = await Order.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page < 1 || page > totalPages) {
      return res.status(404).json({ message: "Page not found" });
    }

    const orderList = await Order.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    if (!orderList) {
      res.status(500).json({ success: false });
    }

    return res.status(200).json({
      orderList: orderList,
      totalPages: totalPages,
      page: page,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res
      .status(500)
      .json({ message: "The order with the given id was not found." });
  }
  return res.status(200).send(order);
});

router.delete("/:id", async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) {
    res.status(404).json({
      message: "Order not found",
      success: false,
    });
  }
  res.status(200).json({
    success: true,
    message: "Order is deleted",
  });
});

router.post("/create", async (req, res) => {
  let order = new Order({
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    pinCode: req.body.pinCode,
    amount: req.body.amount,
    paymentId: req.body.paymentId,
    email: req.body.email,
    userId: req.body.userId,
    products: req.body.products,
  });

  if (!order) {
    res.status(500).json({ success: false });
  }
  order = await order.save();
  res.status(201).json(order);
});

router.put("/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      pinCode: req.body.pinCode,
      amount: req.body.amount,
      paymentId: req.body.paymentId,
      email: req.body.email,
      userId: req.body.userId,
      products: req.body.products,
      status: req.body.status,
    },
    { new: true }
  );
  if (!order) {
    return res.status(500).json({ message: "Order cannot be updated!" });
  }
  res.send(order);
});

module.exports = router;

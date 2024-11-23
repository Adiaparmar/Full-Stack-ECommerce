const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const { name, phone, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    const existingUserByPh = await User.findOne({ phone });
    if (existingUser || existingUserByPh) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      name: name,
      phone: phone,
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET
    );
    res.status(201).json({ user: result, token });
  } catch (error) {
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET
    );
    res
      .status(200)
      .json({ user: existingUser, token, msg: "User Authenticated" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/", async (req, res) => {
  const userList = await User.find();

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(500).json({ message: "User not found" });
  }
  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) {
    res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ success: true, message: "User is deleted" });
});

router.put("/:id", async (req, res) => {
  const { name, phone, email, password } = req.body;

  const userExist = await User.findById(req.params.id);
  let newPassword;
  if (req.body.password) {
    newPassword = bcrypt.hashSync(req.body.password, 10);
  } else {
    newPassword = userExist.password;
  }
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true }
  );
  if (!user) {
    return res.status(500).json({ message: "User cannot be updated!" });
  }
  res.send(user);
});

router.get("/get/count", async (req, res) => {
  const userCount = await User.countDocuments((count) => count);

  if (!userCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    userCount: userCount,
  });
});

module.exports = router;

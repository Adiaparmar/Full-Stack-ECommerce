const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
// const authJwt = require("./helper/jwt");

app.use(cors());
app.options("*", cors());

//middleware
app.use(bodyParser.json());
app.use(express.json());
// app.use(authJwt());

//Routes
const categoryRoutes = require("./routes/category");
const subCatSchema = require("./routes/subCat");
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/user");
const cart = require("./routes/cart");
const productReviews = require("./routes/productReviews");
const myList = require("./routes/myList");
const orders = require("./routes/orders");

app.use("/uploads", express.static("uploads"));
app.use(`/api/category`, categoryRoutes);
app.use(`/api/subCat`, subCatSchema);
app.use(`/api/products`, productRoutes);
app.use(`/api/user`, userRoutes);
app.use(`/api/cart`, cart);
app.use(`/api/reviews`, productReviews);
app.use(`/api/myList`, myList);
app.use(`/api/orders`, orders);

//database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connection is Ready...");
    //Server
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

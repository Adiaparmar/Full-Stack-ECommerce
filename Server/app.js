const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.options("*", cors());

//middleware
app.use(bodyParser.json());

//Routes
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/products");

app.use(`/api/category`, categoryRoutes);
app.use(`/api/products`, productRoutes);

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

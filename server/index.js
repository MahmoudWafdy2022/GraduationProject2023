// new 10/22/2023
// const products = require("./data/products");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const uploadRoute = require("./routes/uploadRoutes")
const orderRoute = require("./routes/orderRoute");
const brandRoute = require('./routes/brandRoute')
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const httpStatusText = require("./utils/httpStatusText");
const app = express();
app.use(express.json());

const corsoptions = {
  //to allow requests from client
  origin: [
    "http://192.168.1.10:5173",
    "http://192.168.1.10",
    "http://localhost:3001",
    "http://127.0.0.1",
    "http://104.142.122.231",
    "http://localhost:5173",
  ],
  optionsSuccessStatus: 200,
  credentials: true,
  exposedheaders: ["set-cookie"],
};
app.use(cors(corsoptions));
const cookieParser = require("cookie-parser");
app.use(cookieParser());
require("dotenv").config();
const url = process.env.MONGO_URL;
mongoose.connect(url).then(() => {
  console.log("Db connect success");
});

app.use("/", userRoute);

app.use("/", productRoute);
app.use("/", orderRoute);
app.use("/", uploadRoute);
app.use("/", brandRoute);



app.get("/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

app.all("*", (req, res) => {
  res
    .status(404)
    .json({ status: httpStatusText.ERROR, message: "That page doesn't exist" });
});

app.listen(process.env.PORT, () => {
  console.log(`server run on port ${process.env.PORT}`);
});

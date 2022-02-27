require("dotenv").config();
const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const cookieParse = require("cookie-parser");
const authRouts = require("./routes/auth");
const userRouts = require("./routes/user");
const app = express();
app.use(express.json());

app.use(cookieParse());
app.use(cors());
mongoose.connect(process.env.MONGOOSE_DB_URL, (err) => {
  if (err) throw err;
  console.log("Connected to MongoDB");
});

app.use("/user", authRouts);
app.use("/user", userRouts);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// ROUTERS
app.listen(8000, () => {
  console.log("Server is runing");
});

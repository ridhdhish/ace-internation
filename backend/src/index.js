require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const productRoute = require("./routes/productRoute");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

//cors & helmet => for security
app.use(cors());
app.use(helmet());

// used to log requests
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(
  express.json({
    extended: false,
  })
);

app.use(productRoute);

app.get("/", (req, res) => {
  res.json("API running.");
});

// Database connection
const conn = process.env.DB_CONN;
module.exports = mongoose
  .connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected");
    app.listen(PORT, () =>
      console.log("Server is running at http://127.0.0.1:" + PORT)
    );
  })
  .catch((err) => {
    console.log(err);
  });

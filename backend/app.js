const express = require("express");
require("dotenv").config();
const helmet = require("helmet");
// const cors = require("cors");
const db = require("./models");
const path = require("path");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const likeRoutes = require("./routes/like");
const commentRoutes = require("./routes/comment");

const app = express();

// app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(helmet());

db.sequelize.sync();

const dbTestConnexion = async function () {
  try {
    await db.sequelize.authenticate();
    console.log(" connection succes!!!!!!!!!!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
dbTestConnexion();

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/user", userRoutes);

app.use("/api/post", postRoutes);

app.use("/api/like", likeRoutes);

app.use("/api/comment", commentRoutes);

module.exports = app;

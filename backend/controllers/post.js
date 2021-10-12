const { Post } = require("../models");
const { User } = require("../models");
const { Like } = require("../models");
const { Comment } = require("../models");

const fs = require("fs");
const sequelize = require("sequelize");

exports.getAllPost = (req, res, next) => {
  Post.findAll({
    include: [
      {
        model: User,
        attributes: ["pseudo", "photo", "id"],
      },
      {
        model: Comment,
        attributes: ["message", "UserId", "updatedAt"],
      },
      {
        model: Like,
        // attributes: "UserId",
      },
    ],
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

exports.createPost = (req, res, next) => {
  console.log(req.file);
  const test = req.file;

  if (test == null) {
    Post.create({
      UserId: req.body.UserId,
      message: req.body.message,
      video: req.body.video,
    })
      .then(() =>
        res.status(201).json({ message: "Le post a été créé sans image" })
      )
      .catch((error) => res.status(500).json({ error }));
  } else {
    Post.create({
      UserId: req.body.UserId,
      message: req.body.message,
      picture: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
      video: req.body.video,
    })
      .then(() =>
        res.status(201).json({ message: "Le post a été créé avec une image" })
      )
      .catch((error) => res.status(500).json({ error }));
  }

  console.log(req.body);
};

exports.deletePost = (req, res, next) => {
  console.log("***********************************", req);
  Post.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "post suprrimé" }))
    .catch((error) => res.status(400).json({ error }));
};
//YOUTUBE VIDEO
// var url = url.replace("watch?v=", "v/");
// `${req.protocol}://${req.get("host")}/images/${req.body.file}`
// ...postObject,
//     picture: `${req.protocol}://${req.get("host")}/images/${req.body.picture}`,

const { Like } = require("../models");

exports.like = async (req, res, next) => {
  const { PostId } = req.body;
  const { UserId } = req.body;

  const foundLike = await Like.findOne({
    where: { PostId, UserId },
  });

  if (!foundLike) {
    Like.create({ PostId, UserId })
      .then(() => res.status(201).json({ message: "post liké" }))
      .catch((error) => res.status(500).json({ error }));
  } else {
    Like.destroy({ where: { PostId, UserId } })
      .then((like) => res.status(200).json({ message: "post disliké" }))
      .catch((error) => res.status(400).json({ error }));
  }

  Like.findAll({ where: { PostId } })
    .then((likes) => res.json({ like: likes.length }))
    .catch((error) => res.status(404).json({ error }));
};

exports.likeCounter = async (req, res, next) => {
  await Like.findAll({ where: { PostId: req.params.id } })
    .then((like) => res.status(200).json({ like: like.length }))
    .catch((error) => res.status(404).json({ error }));
};

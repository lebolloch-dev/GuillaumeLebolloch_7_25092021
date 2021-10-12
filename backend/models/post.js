"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
      models.Post.hasMany(models.Comment);
      models.Post.hasMany(models.Like);
    }
  }
  Post.init(
    {
      message: { type: DataTypes.STRING, allowNull: false },
      picture: { type: DataTypes.STRING, allowNull: true },
      video: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
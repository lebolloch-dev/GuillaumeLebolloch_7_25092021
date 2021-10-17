"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // UN USER PEUT AVOIR PLUSIEUR POST, COMMENT ET LIKE
      models.User.hasMany(models.Post);
      models.User.hasMany(models.Comment);
      models.User.hasMany(models.Like);
    }
  }
  User.init(
    {
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      pseudo: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:
          "https://i.pinimg.com/236x/fd/2c/aa/fd2caa9fd03a24a112ce4f20b51d66de.jpg",
      },
      bio: { type: DataTypes.STRING(500), allowNull: true },
      isAdmin: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

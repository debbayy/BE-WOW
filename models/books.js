"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      books.hasMany(models.mylist, {
        as: "mylist",
        foreignKey: {
          name: "idBook",
        },
      });
    }
  }
  books.init(
    {
      title: DataTypes.STRING,
      publicationDate: DataTypes.STRING,
      pages: DataTypes.STRING,
      author: DataTypes.STRING,
      isbn: DataTypes.STRING,
      about: DataTypes.TEXT,
      abautThisBook: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "books",
    }
  );
  return books;
};

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class mylist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      mylist.belongsTo(models.user, {
        as: "users",
        foreignKey: {
          name: "idUser",
        },
      });

      mylist.belongsTo(models.books, {
        as: "books",
        foreignKey: {
          name: "idBook",
        },
      });
    }
  }
  mylist.init(
    {
      idUser: DataTypes.INTEGER,
      idBook: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "mylist",
    }
  );
  return mylist;
};

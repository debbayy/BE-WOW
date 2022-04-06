"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trans extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      trans.belongsTo(models.user, {
        as: "user",
        foreignKey: { name: "idUser" },
      });
    }
  }
  trans.init(
    {
      idUser: DataTypes.INTEGER,
      accountNumber: DataTypes.STRING,
      transferProof: DataTypes.STRING,
      remainingActive: DataTypes.STRING,
      userStatus: DataTypes.STRING,
      paymentStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "trans",
    }
  );
  return trans;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RecipeHistoryStep extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RecipeHistoryStep.init(
    {
      recipeHistoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stepOrder: DataTypes.INTEGER,
      description: DataTypes.STRING,
      done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "RecipeHistoryStep",
    }
  );
  return RecipeHistoryStep;
};

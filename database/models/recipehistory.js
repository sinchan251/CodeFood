"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RecipeHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.RecipeHistoryStep, {
        foreignKey: "recipeHistoryId",
        as: "steps",
      });
    }
  }
  RecipeHistory.init(
    {
      nServing: DataTypes.INTEGER,
      reaction: {
        type: DataTypes.ENUM(["like", "neutral", "dislike"]),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "recipe_histories",
    }
  );
  return RecipeHistory;
};

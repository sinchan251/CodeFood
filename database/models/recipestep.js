const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const RecipeStep = class extends Model {
    static associate(models) {}
  };
  RecipeStep.init(
    {
      stepOrder: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recipeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "recipes",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "recipe_steps",
    }
  );
  return RecipeStep;
};

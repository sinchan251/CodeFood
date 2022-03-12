const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const RecipeIngredient = class extends Model {
    static associate(models) {
      this.belongsTo(models.Recipe, { foreignKey: "recipeId" });
    }
  };

  RecipeIngredient.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
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
      item: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "recipe_ingredients",
    }
  );

  return RecipeIngredient;
};

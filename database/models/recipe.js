const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Recipe = class extends Model {
    static associate(models) {
      this.hasOne(models.RecipeCategory, {
        sourceKey: "recipeCategoryId",
        foreignKey: "id",
        as: "recipeCategory",
      });

      this.hasMany(models.RecipeIngredient, {
        as: "ingredientsPerServing",
        foreignKey: "recipeId",
      });

      this.hasMany(models.RecipeStep, {
        as: "steps",
        foreignKey: "recipeId",
      });
    }
  };

  Recipe.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recipeCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "recipe_categories",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nServing: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nReactionLike: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      nReactionNeutral: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      nReactionDislike: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "recipes",
    }
  );
  return Recipe;
};

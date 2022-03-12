const db = require("../database/models");
const Recipe = db.sequelize.model("Recipe");
const RecipeStep = db.sequelize.model("RecipeStep");
const RecipeHistory = db.sequelize.model("RecipeHistory");

const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    const recipeData = await Recipe.findOne({
      where: {
        id: req.body.recipeId,
      },
      include: [
        "recipeCategory",
        {
          model: RecipeStep,
          as: "steps",
          attributes: ["stepOrder", "description"],
        },
      ],
    });

    if (!recipeData) {
      throw {
        status: 404,
        message: "Recipe not found",
      };
    }

    const recipeHistory = {
      userId: req.user.id,
      nServing: req.body.nServing,
      recipeId: recipeData.id,
      recipeCategoryId: recipeData.recipeCategoryId,
      recipeName: recipeData.name,
      recipeCategoryName: recipeData.recipeCategory.name,
      recipeImage: recipeData.image,
      steps: recipeData.steps,
    };

    const createRecipeHistory = await RecipeHistory.create(recipeHistory, {
      include: ["steps"],
    });

    return res.json({
      success: true,
      message: "Success",
      data: createRecipeHistory,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

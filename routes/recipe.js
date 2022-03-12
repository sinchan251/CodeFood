const router = require("express").Router();

const db = require("../database/models");
const Recipe = db.sequelize.model("Recipe");
const RecipeIngredient = db.sequelize.model("RecipeIngredient");
const RecipeStep = db.sequelize.model("RecipeStep");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/", async (req, res) => {
  const q = req.query.q || "";
  const sort = req.query.sort;

  const [sortKey, sortOrder] = sort.split("_");
  let order = null;
  switch (sortKey) {
    case "like":
      order = [["nReactionLike", sortOrder]];
      break;
    case "newest":
      order = [["updatedAt", "DESC"]];
      break;
    default:
      order = [[sortKey, sortOrder]];
  }

  const dataResep = await Recipe.findAll({
    where: {
      name: {
        [Op.like]: `%${q}%`,
      },
    },
    include: [
      {
        model: RecipeIngredient,
        as: "ingredientsPerServing",
        attributes: ["item", "unit", "value"],
      },
      {
        model: RecipeStep,
        as: "steps",
        attributes: ["stepOrder", "description"],
      },
    ],
    order,
  });

  return res.json({
    success: true,
    message: "Success",
    data: {
      total: dataResep.length,
      data: dataResep,
    },
  });
});

router.post("/", async (req, res, next) => {
  try {
    const recipe = {
      name: req.body.name,
      recipeCategoryId: req.body.recipeCategoryId,
      image: req.body.image,
      nServing: req.body.nServing,
      ingredientsPerServing: req.body.ingredientsPerServing,
      steps: req.body.steps,
    };

    //nanti buat validator nya
    //ingredients bertipe array dan memiliki property item, unit, value

    const createRecipe = await Recipe.create(recipe, {
      include: ["ingredientsPerServing", "steps"],
    });

    return res.json({
      status: true,
      message: "Recipe created",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findOne({
      where: {
        id: recipeId,
      },
      include: [
        "recipeCategory",
        {
          model: RecipeIngredient,
          as: "ingredientsPerServing",
          attributes: ["item", "unit", "value"],
        },
      ],
    });
    if (!recipe) {
      throw new Error("Recipe not found");
    }

    return res.json({
      success: true,
      message: "Success",
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/steps", async (req, res) => {
  const dataResep = await Recipe.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: RecipeStep,
        as: "steps",
        attributes: ["stepOrder", "description"],
      },
    ],
  });

  return res.json({
    success: true,
    message: "Success",
    data: dataResep.steps,
  });
});
module.exports = router;

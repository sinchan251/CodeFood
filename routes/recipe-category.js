var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");
const db = require("../database/models");

const RecipeCategory = db.sequelize.model("RecipeCategory");

const v = new Validator();

router.post("/", async (req, res) => {
  const schema = {
    name: "string",
  };

  const category = {
    name: req.body.name,
  };

  const validate = v.validate(category, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  const resepCategory = await RecipeCategory.create(category);

  res.json({
    success: true,
    message: "Success",
    data: resepCategory,
  });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;

  let resepID = await RecipeCategory.findByPk(id);

  if (!resepID) {
    return res.json({ message: "Recipe Not Found" });
  }

  const schema = {
    name: "string|optional",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  resepID = await resepID.update(req.body);
  res.json({
    success: true,
    message: "Success",
    data: resepID,
  });
});

router.get("/", async (req, res) => {
  const recipesCategory = await RecipeCategory.findAll();
  return res.json({
    success: true,
    message: "Success",
    data: recipesCategory || {},
  });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const recipeCategory = await RecipeCategory.findByPk(id);
  return res.json({
    success: true,
    message: "Success",
    data: recipeCategory || {},
  });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const resepID = await RecipeCategory.findByPk(id);

  if (!resepID) {
    return res.json({ message: "Recipe Not Found" });
  }

  await resepID.destroy();
  return res.json({
    success: true,
    message: "Success",
    data: {},
  });
});

module.exports = router;

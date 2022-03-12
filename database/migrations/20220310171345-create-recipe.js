"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("recipes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      recipeCategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "recipe_categories",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nServing: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nReactionLike: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      nReactionNeutral: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      nReactionDislike: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("recipes");
  },
};

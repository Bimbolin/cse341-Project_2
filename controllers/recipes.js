const { response } = require('express');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all recipes
const getAll = async (req, res) => {
  //#swagger.tags=['recipes']
  try {
    const result = await mongodb.getDatabase().db().collection('recipes').find();
    result.toArray().then((recipes) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(recipes);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single recipe
const getSingle = async (req, res) => {
  //#swagger.tags=['recipes']
  try {
    const recipesId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('recipes').find({ _id: recipesId });
    result.toArray().then((recipes) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(recipes[0]);
    });
  } catch (err) {
    res.status(500).json({ error: 'Invalid ID format' });
  }
};

// Create a new recipe
const createRecipe = async (req, res) => {
  //#swagger.tags=['recipes']
  const recipe = {
    title: req.body.title,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    cookTime: req.body.cookTime,
    servings: req.body.servings,
    difficulty: req.body.difficulty,
    author: req.body.author,
    tags: req.body.tags
  };

  // Basic validation
  if (!recipe.title || !recipe.instructions) {
    return res.status(400).json({ error: 'Title and instructions are required.' });
  }

  try {
    const response = await mongodb.getDatabase().db().collection('recipes').insertOne(recipe);
    if (response.acknowledged) {
      res.status(201).json({ message: 'Recipe created successfully', id: response.insertedId });
    } else {
      res.status(500).json({ error: 'Failed to create recipe.' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a recipe
const updateRecipe = async (req, res) => {
  //#swagger.tags=['recipes']
  try {
    const recipesId = new ObjectId(req.params.id);
    const recipe = {
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      cookTime: req.body.cookTime,
      servings: req.body.servings,
      difficulty: req.body.difficulty,
      author: req.body.author,
      tags: req.body.tags
    };

    // Basic validation
    if (!recipe.title || !recipe.instructions) {
      return res.status(400).json({ error: 'Title and instructions are required.' });
    }

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('recipes')
      .replaceOne({ _id: recipesId }, recipe);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Recipe not found or no changes made.' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format or update failed.' });
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  //#swagger.tags=['recipes']
  try {
    const recipesId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('recipes').deleteOne({ _id: recipesId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Recipe not found.' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format or deletion failed.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createRecipe,
  updateRecipe,
  deleteRecipe
};
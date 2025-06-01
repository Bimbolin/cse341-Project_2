const { response } = require('express');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all users
const getAll = async (req, res) => {
  //#swagger.tags=['users']
  try {
    const users = await mongodb.getDatabase().db().collection('users').find().toArray();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single user by ID
const getSingle = async (req, res) => {
  //#swagger.tags=['recipes']
  try {
    const usersId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({ _id: usersId });
    result.toArray().then((users) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(users[0]);
    });
  } catch (err) {
    res.status(500).json({ error: 'Invalid ID format' });
  }
};

// Create a user (from req.body, useful for testing via POST)
const createUser = async (req, res) => {
  //#swagger.tags=['users']
  const user = {
    number: req.body.number,
    githubId: req.body.githubId,
    username: req.body.username,
    displayName: req.body.displayName,
    email: req.body.email,
    profileUrl: req.body.profileUrl,
    avatarUrl: req.body.avatarUrl
  };

  // Basic validation
  if (!user.githubId || !user.username) {
    return res.status(400).json({ error: 'githubId and username are required.' });
  }

  try {
    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.acknowledged) {
      res.status(201).json({ message: 'User created successfully', id: response.insertedId });
    } else {
      res.status(500).json({ error: 'Failed to create user.' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  //#swagger.tags=['users']
  try {
    const usersId = new ObjectId(req.params.id);
    const user = {
      number: req.body.number,
      githubId: req.body.githubId,
      username: req.body.username,
      displayName: req.body.displayName,
      email: req.body.email,
      profileUrl: req.body.profileUrl,
      avatarUrl: req.body.avatarUrl
    };

    if (!user.githubId || !user.username) {
      return res.status(400).json({ error: 'githubId and username are required.' });
    }

    const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: usersId }, user);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User not found or no changes made.' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format or update failed.' });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  //#swagger.tags=['users']
  try {
    const usersId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: usersId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format or deletion failed.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};

const express = require('express');
const router = express.Router();
const { authenticateJwt }= require('../middleware/auth'); 
const User = require('../models/user');


//Create Route
router.post('/todos',authenticateJwt, async (req, res) => {
  const username = req.user.username;
  const { title, description } = req.body;

  try {
    const user = await User.findOne({"username": username})

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    if(!user.todo){
      user.todos = [];
    }
    user.todos.push({ title, description, completed: false });
    await user.save();

    res.status(201).json({ message: 'Todo created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating Todo.' });
  }
});

// Get Route
router.get('/todos',authenticateJwt, async (req, res) => {
  const username = req.user.username;

  try {
    const user = await User.findOne({"username": username})

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ todos: user.todos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching Todos.' });
  }
});

//Update routes
router.patch('/todos/:id',authenticateJwt, async (req, res) => {
  const username = req.user.username;
  const todoId = req.params.id;
  const updates = req.body;

  try {
    const user = await User.findOne({"username": username})

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const todoToUpdate = user.todos._id(todoId);

    if (!todoToUpdate) {
      return res.status(404).json({ message: 'Todo not found.' });
    }

    // Update the todo properties
    Object.assign(todoToUpdate, updates);

    await user.save();

    res.status(200).json({ message: 'Todo updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating Todo.' });
  }
});

// Delete Route
router.delete('/todos/:id',authenticateJwt, async (req, res) => {
  const username = req.user.username;
  const todoId = req.params.id;

  try {
    const user = await User.findOne({"username": username})

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const todoToDelete = user.todos._id(todoId);

    if (!todoToDelete) {
      return res.status(404).json({ message: 'Todo not found.' });
    }

    todoToDelete.remove();
    await user.save();

    res.status(200).json({ message: 'Todo deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting Todo.' });
  }
});



module.exports = router;

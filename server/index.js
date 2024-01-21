const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Todo = require('./models/Todo');
const User = require('./models/User');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

async function mongodb() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Todo');
}

mongodb()
  .then(() => {
    console.log('Connection established');
  })
  .catch((data) => {
    console.log('Failed to connect to mongodb');
    console.log(data);
  });

  app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
      const newUser = new User({ username, password });
      await newUser.save();
      res.status(201).json({ message: 'User signed up successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error signing up user.' });
    }
  });

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (user) {
      res.status(200).json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in.' });
  }
});


// Get todos
app.get('/todos', async (req, res) => {
  try {
    let todos = await Todo.find();
    res.send(todos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Post a Todo
app.post('/todos', async (req, res) => {
  try {
    let { title, des } = req.body;
    const newTodo = new Todo({
      title,
      des,
    });
    await newTodo.save();
    console.log('Todo saved successfully');
    res.status(201).send('Todo saved successfully');
  } catch (error) {
    console.error(error);
    res.status(400).send('Provide details correctly');
  }
});

// Delete a Todo
app.delete('/todos/:id', async (req, res) => {
  try {
    let { id } = req.params;
    await Todo.findByIdAndDelete(id);
    console.log('Successfully deleted the Todo');
    res.status(200).send('Successfully deleted the Todo');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => {
  console.log('Listening at port 3000');
});

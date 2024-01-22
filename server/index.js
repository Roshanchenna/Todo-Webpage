const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { SECRET } = require("./middleware/auth")
const mongoose = require('mongoose');
const User = require('./models/User');
const TodoRouter = require("./routes/Todo");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/user", TodoRouter);


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

  app.post('/signup', (req, res) => {
    const { username, password } = req.body;
     async function callback(admin) {
      if (admin) {
        res.status(403).json({ message: 'User already exists' });
      } else {
        const newUser = new User({ username, password, todos: [] });
        await newUser.save(); 
        const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'User created successfully', token });
      }
  
    }
    User.findOne({ username }).then(callback);
  });
  

  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  })


app.listen(3000, () => {
  console.log('Listening at port 3000');
});

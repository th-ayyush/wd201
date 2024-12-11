const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Todo } = require('./models');

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files (e.g., CSS)

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Route to render the index page
app.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll(); // Fetch todos from the database
    res.render('index', { todos });
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = app;


// Import required modules
const express = require('express');
const app = express(); // Initialize Express app
const bodyParser = require('body-parser');
const todosRoutes = require('./app'); // Import routes from app.js

// Middleware setup
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Define a health check route
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the To-Do App!');
});

// Use todos routes
app.use('/todos', todosRoutes);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send('Route not found!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

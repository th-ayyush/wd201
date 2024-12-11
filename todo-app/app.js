const express = require('express');
const { Todo } = require('./models'); // Import the Todo model
const app = express();

app.use(express.json());

// GET /todos - Fetch all To-Dos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.findAll(); // Sequelize method to fetch all records
        res.status(200).json(todos); // Send the list of To-Dos as a response
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch To-Dos.' });
    }
});

// Export the app for testing
module.exports = app;


// DELETE /todos/:id - Delete a To-Do by ID
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Todo.destroy({ where: { id } }); // Sequelize method to delete a record
        res.status(200).json(result > 0); // Return true if deletion was successful, false otherwise
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete To-Do.' });
    }
});

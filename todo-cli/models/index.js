'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Read database configuration from config/config.js
const config = {
  username: process.env.DB_USER || 'root',  // Use default or environment variable
  password: process.env.DB_PASSWORD || '',  // Use default or environment variable
  database: process.env.DB_NAME || 'todo_db', // Database name
  host: process.env.DB_HOST || 'localhost',  // Database host
  dialect: 'mysql',  // Specify dialect (mysql, postgres, sqlite, etc.)
};

// Create a new Sequelize instance
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Read all model files in the current directory
const db = {};

// Dynamically load models from the 'models' directory
fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js' && file.endsWith('.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// Initialize model associations if necessary (e.g., Todo belongsTo a User)
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Add the Sequelize instance to the db object for external access
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

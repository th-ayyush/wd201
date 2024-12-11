'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    // Add a new to-do task
    static async addTask(params) {
      return await Todo.create(params);
    }

    // Show the to-do list by category
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const overdueItems = await Todo.overdue();
      overdueItems.forEach(item => console.log(item.displayableString()));
      console.log("\n");

      console.log("Due Today");
      const dueTodayItems = await Todo.dueToday();
      dueTodayItems.forEach(item => console.log(item.displayableString()));
      console.log("\n");

      console.log("Due Later");
      const dueLaterItems = await Todo.dueLater();
      dueLaterItems.forEach(item => console.log(item.displayableString()));
    }

    // Get overdue tasks (past due)
    static async overdue() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [sequelize.Op.lt]: new Date().toISOString().split('T')[0], // Before today
          },
          completed: false, // Only incomplete tasks
        },
        order: [['dueDate', 'ASC']],
      });
    }

    // Get tasks that are due today
    static async dueToday() {
      const today = new Date().toISOString().split('T')[0]; // Current date
      return await Todo.findAll({
        where: {
          dueDate: today,
          completed: false, // Only incomplete tasks
        },
        order: [['dueDate', 'ASC']],
      });
    }

    // Get tasks that are due later (future)
    static async dueLater() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [sequelize.Op.gt]: new Date().toISOString().split('T')[0], // After today
          },
          completed: false, // Only incomplete tasks
        },
        order: [['dueDate', 'ASC']],
      });
    }

    // Mark a task as completed by its ID
    static async markAsComplete(id) {
      const todo = await Todo.findByPk(id);
      if (todo) {
        todo.completed = true;
        await todo.save();
      }
    }

    // Helper method to display the task as a formatted string
    displayableString() {
      const checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }

  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Todo',
    }
  );

  return Todo;
};

const request = require('supertest');
const app = require('../index');
const { Todo } = require('../models');

jest.mock('../models');

describe('DELETE /todos/:id', () => {
    it('should delete a To-Do and return true', async () => {
        Todo.destroy.mockResolvedValue(1); // Mock Sequelize to simulate successful deletion

        const response = await request(app).delete('/todos/1');
        expect(response.status).toBe(200);
        expect(response.body).toBe(true);
    });

    it('should return false if To-Do does not exist', async () => {
        Todo.destroy.mockResolvedValue(0); // Mock Sequelize to simulate failed deletion

        const response = await request(app).delete('/todos/999');
        expect(response.status).toBe(200);
        expect(response.body).toBe(false);
    });

    it('should handle errors gracefully', async () => {
        Todo.destroy.mockRejectedValue(new Error('Database error')); // Mock Sequelize to throw an error

        const response = await request(app).delete('/todos/1');
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to delete To-Do.' });
    });
});

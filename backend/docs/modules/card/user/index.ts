
import { UserController } from './controller/user.controller.js';
import { Express } from 'express';

export function registerUserRoutes(app: Express) {
  const controller = new UserController();

  app.post('/api/users', (req, res) => controller.createUser(req, res));
  app.get('/api/users/:id', (req, res) => controller.getUserById(req, res));
  app.get('/api/cards', (req, res) => controller.getAllUsers(req, res));
  app.put('/api/cards/:id', (req, res) => controller.updateUser(req, res));
  app.delete('/api/users/:id', (req, res) => controller.deleteUser(req, res));
}

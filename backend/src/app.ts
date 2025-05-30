import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors"
// import { UserController } from './modules/user';
import { CardController } from './modules/card/controller/card.controller.js';

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173',
}));
// User routes
// const userController = new UserController();
// app.post('/api/users', (req, res) => userController.createUser(req, res));
// app.get('/api/users', (req, res) => userController.getAllUsers(req, res));

// Card routes
const cardController = new CardController();

app.post('/api/cards', (req, res) => cardController.createCard(req, res));
app.get('/api/cards', (req, res) => cardController.getAllCards(req, res));
app.get('/api/cards/:id', (req, res) => cardController.getCardById(req, res));
app.put('/api/cards/:id', (req, res) => cardController.updateCard(req, res));
app.delete('/api/cards/:id', (req, res) => cardController.deleteCard(req, res));

export default app;

// src/modules/card/controller/card.controller.ts
import { Request, Response } from 'express';
import { CardService } from '../service/card.service.js';
import { CreateCardDto } from '../dto/create-card.dto.js';
import { UpdateCardDto } from '../dto/update-card.dto.js';

const cardService = new CardService();

export class CardController {
  async createCard(req: Request, res: Response) {
    const dto = req.body as CreateCardDto;
    const card = await cardService.createCard(dto);
    res.status(201).json(card);
  }

  async getAllCards(req: Request, res: Response) {
    const cards = await cardService.getAllCards();
    res.status(200).json(cards);
  }

  async getCardById(req: Request, res: Response) {
    const card = await cardService.getCardById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    res.status(200).json(card);
  }

  async updateCard(req: Request, res: Response) {
    try {
      const dto = req.body as UpdateCardDto;
      const card = await cardService.updateCard(req.params.id, dto);
      if (!card) {
        return res.status(404).json({ message: 'Card not found' });
      }
      res.status(200).json(card);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update card', error });
    }
  }

  async deleteCard(req: Request, res: Response) {
    await cardService.deleteCard(req.params.id);
    res.status(204).send();
  }
}

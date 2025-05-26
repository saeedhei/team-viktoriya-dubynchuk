// src/modules/card/service/card.service.ts
import { CardRepositoryMongo } from '../infrastructure/card.repository.mongo.js';
import { CreateCardDto } from '../dto/create-card.dto.js';
import { UpdateCardDto } from '../dto/update-card.dto.js';

export class CardService {
  private readonly cardRepository = new CardRepositoryMongo();

  async createCard(dto: CreateCardDto) {
    return this.cardRepository.create(dto);
  }

  async getAllCards() {
    return this.cardRepository.findAll();
  }
  async getCardById(id: string) {
    return this.cardRepository.findById(id);
  }

  async updateCard(id: string, dto: UpdateCardDto) {
    return this.cardRepository.update(id, dto);
  }

  async deleteCard(id: string) {
    return this.cardRepository.delete(id);
  }
}

// src/modules/card/infrastructure/card.repository.mongo.ts
import { ICardRepository } from '../repository/card.repository.interface.js';
import { CreateCardDto } from '../dto/create-card.dto.js';
import { UpdateCardDto } from '../dto/update-card.dto.js';
import { CardResponseDto } from '../dto/card-response.dto.js';
import { v4 as uuidv4 } from 'uuid';

export class CardRepositoryMongo implements ICardRepository {
  private cards: CardResponseDto[] = [];

  async create(data: CreateCardDto): Promise<CardResponseDto> {
    const newCard: CardResponseDto = { _id: uuidv4(), ...data };
    this.cards.push(newCard);
    return newCard;
  }

  async findAll(): Promise<CardResponseDto[]> {
    return this.cards;
  }

  async findById(id: string): Promise<CardResponseDto | null> {
    return this.cards.find((card) => card._id === id) || null;
  }

  async update(id: string, data: UpdateCardDto): Promise<CardResponseDto | null> {
    const index = this.cards.findIndex((card) => card._id === id);
    if (index === -1) return null;

    this.cards[index] = { ...this.cards[index], ...data };
    return this.cards[index];
  }

  async delete(id: string): Promise<void> {
    this.cards = this.cards.filter((card) => card._id !== id);
  }
}

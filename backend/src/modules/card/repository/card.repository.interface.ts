// src/modules/card/repository/card.repository.interface.ts
import { CreateCardDto } from '../dto/create-card.dto.js';
import { UpdateCardDto } from '../dto/update-card.dto.js';
import { CardResponseDto } from '../dto/card-response.dto.js';

export interface ICardRepository {
  create(data: CreateCardDto): Promise<CardResponseDto>;
  findAll(): Promise<CardResponseDto[]>;
  findById(id: string): Promise<CardResponseDto | null>;
  update(id: string, data: UpdateCardDto): Promise<CardResponseDto | null>;
  delete(id: string): Promise<void>;
}

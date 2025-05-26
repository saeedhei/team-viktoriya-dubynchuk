src/
├── modules/
│   ├── user/
│   │   ├── controller/
│   │   │   └── user.controller.ts
│   │   ├── service/
│   │   │   └── user.service.ts
│   │   ├── domain/
│   │   │   ├── user.entity.ts
│   │   │   └── user.types.ts
│   │   ├── repository/
│   │   │   └── user.repository.interface.ts
│   │   ├── infrastructure/
│   │   │   └── user.repository.mongo.ts
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── user-response.dto.ts
│   │   └── index.ts
│   └── card/
│       ├── controller/
│       │   └── card.controller.ts
│       ├── service/
│       │   └── card.service.ts
│       ├── domain/
│       │   ├── card.entity.ts
│       │   └── card.types.ts
│       ├── repository/
│       │   └── card.repository.interface.ts
│       ├── infrastructure/
│       │   └── card.repository.mongo.ts
│       ├── dto/
│       │   ├── create-card.dto.ts
│       │   └── card-response.dto.ts
│       └── index.ts
├── config/
│   ├── env.ts
│   └── database.ts
├── shared/
│   ├── utils/
│   │   └── hash.util.ts
│   ├── middleware/
│   │   ├── error.middleware.ts
│   │   └── auth.middleware.ts
│   ├── exceptions/
│   │   └── custom.exceptions.ts
│   └── constants/
│       └── app.constants.ts
├── app.ts
└── server.ts

// src/modules/card/domain/card.types.ts
export interface Translation {
  text: string;
  language: string;
}

export type CardCategory =
  | 'verbs'
  | 'nouns'
  | 'adjectives'
  | 'adverbs'
  | 'pronouns'
  | 'prepositions'
  | 'conjunctions'
  | 'interjections'
  | 'phrases';

export type CardDifficulty = 'easy' | 'medium' | 'hard';

// src/modules/card/domain/card.entity.ts
import { Translation, CardCategory, CardDifficulty } from './card.types';

export class Card {
  constructor(
    public word: string,
    public translation: Translation[],
    public category: CardCategory,
    public difficulty: CardDifficulty,
    public _id?: string,
    public transcription?: string,
    public example?: Translation[],
    public audioUrl?: string,
  ) {}
}

// src/modules/card/dto/create-card.dto.ts
import { Translation, CardCategory, CardDifficulty } from '../domain/card.types';

export interface CreateCardDto {
  word: string;
  transcription?: string;
  translation: Translation[];
  example?: Translation[];
  audioUrl?: string;
  category: CardCategory;
  difficulty: CardDifficulty;
}

// src/modules/card/dto/card-response.dto.ts
import { Translation, CardCategory, CardDifficulty } from '../domain/card.types';

export interface CardResponseDto {
  _id: string;
  word: string;
  transcription?: string;
  translation: Translation[];
  example?: Translation[];
  audioUrl?: string;
  category: CardCategory;
  difficulty: CardDifficulty;
}

// src/modules/card/repository/card.repository.interface.ts
import { CreateCardDto } from '../dto/create-card.dto';
import { CardResponseDto } from '../dto/card-response.dto';

export interface ICardRepository {
  create(data: CreateCardDto): Promise<CardResponseDto>;
  findAll(): Promise<CardResponseDto[]>;
}

// src/modules/card/infrastructure/card.repository.mongo.ts
import { ICardRepository } from '../repository/card.repository.interface';
import { CreateCardDto } from '../dto/create-card.dto';
import { CardResponseDto } from '../dto/card-response.dto';
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
}

// src/modules/card/service/card.service.ts
import { CardRepositoryMongo } from '../infrastructure/card.repository.mongo';
import { CreateCardDto } from '../dto/create-card.dto';

export class CardService {
  private readonly cardRepository = new CardRepositoryMongo();

  async createCard(dto: CreateCardDto) {
    return this.cardRepository.create(dto);
  }

  async getAllCards() {
    return this.cardRepository.findAll();
  }
}

// src/modules/card/controller/card.controller.ts
import { Request, Response } from 'express';
import { CardService } from '../service/card.service';
import { CreateCardDto } from '../dto/create-card.dto';

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
}

// src/modules/card/index.ts
export * from './controller/card.controller';

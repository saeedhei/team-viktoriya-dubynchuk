modules/
│ ├── user/
│ │ ├── controller/
│ │ │ └── user.controller.ts
│ │ ├── service/
│ │ │ └── user.service.ts
│ │ ├── domain/
│ │ │ ├── user.entity.ts
│ │ │ └── user.types.ts
│ │ ├── repository/
│ │ │ └── user.repository.interface.ts
│ │ ├── infrastructure/
│ │ │ └── user.repository.mongo.ts
│ │ ├── dto/
│ │ │ ├── create-user.dto.ts
│ │ │ └── user-response.dto.ts
│ │ └── index.ts

// src/modules/user/domain/user.types.ts

export type UserRole = 'user' | 'admin';

// src/modules/user/domain/user.entity.ts

import { UserRole } from './user.types.js';

export class User {
constructor(
public email: string,
public password: string,
public name: string,
public role: UserRole = 'user',
public \_id?: string
) {}
}

// src/modules/user/dto/create-user.dto.ts

export class CreateUserDto {
username!: string;
email!: string;
password!: string;

constructor(data: any) {
this.username = data.username;
this.email = data.email;
this.password = data.password;
}

static validate(data: any): string[] {
const errors: string[] = [];

    if (typeof data.username !== 'string' || data.username.trim() === '') {
      errors.push('Username must be a non-empty string.');
    }

    if (typeof data.email !== 'string' || !/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.push('Email must be a valid email address.');
    }

    if (typeof data.password !== 'string' || data.password.trim() === '') {
      errors.push('Password must be a non-empty string.');
    }

    return errors;

}
}

// src/modules/user/dto/user-response.dto.ts

import { UserRole } from '../domain/user.types.js';

export interface UserResponseDto {
\_id: string;
email: string;
password:string;
name: string;
role: UserRole;
}

// src/modules/user/repository/user.repository.interface.ts

import { CreateUserDto } from '../dto/create-user.dto.js';
import { UserResponseDto } from '../dto/user-response.dto.js';

export interface IUserRepository {
create(data: CreateUserDto): Promise<UserResponseDto>;
findByEmail(email: string): Promise<UserResponseDto | null>;
findAll(): Promise<UserResponseDto[]>;
}

// src/modules/user/infrastructure/user.repository.mongo.ts

import { IUserRepository } from '../repository/user.repository.interface.js';
import { CreateUserDto } from '../dto/create-user.dto.js';
import { UserResponseDto } from '../dto/user-response.dto.js';
import { v4 as uuidv4 } from 'uuid';

export class UserRepositoryMongo implements IUserRepository {
private users: UserResponseDto[] = [];

async create(data: CreateUserDto): Promise<UserResponseDto> {
const user: UserResponseDto = {
\_id: uuidv4(),
email: data.email,
name: data.username,
password: data.password,
role: 'user'
};
this.users.push(user);
return user;
}

async findByEmail(email: string): Promise<UserResponseDto | null> {
return this.users.find(user => user.email === email) || null;
}

async findAll(): Promise<UserResponseDto[]> {
return this.users;
}
async findById(id: string): Promise<UserResponseDto | null> {
return this.users.find(user => user.\_id === id) || null;
}
async update(id: string, updateData: Partial<CreateUserDto>): Promise<UserResponseDto | null> {
const index = this.users.findIndex(user => user.\_id === id);
if (index === -1) return null;

this.users[index] = { ...this.users[index], ...updateData };
return this.users[index];
}
async delete(id: string): Promise<boolean> {
const index = this.users.findIndex(user => user.\_id === id);
if (index === -1) return false;
this.users.splice(index, 1);
return true;
}
}

// src/modules/user/service/user.service.ts

import { UserRepositoryMongo } from '../infrastructure/user.repository.mongo.js';
import { CreateUserDto } from '../dto/create-user.dto.js';

export class UserService {
private readonly userRepository = new UserRepositoryMongo();

async createUser(dto: CreateUserDto) {
return this.userRepository.create(dto);
}

async getAllUsers() {
return this.userRepository.findAll();
}
async getUserByEmail(email: string) {
return this.userRepository.findByEmail(email);
}
async getUserById(id: string) {
return this.userRepository.findById(id);
}
async updateUser(id: string, updateData: Partial<CreateUserDto>) {
return this.userRepository.update(id, updateData);
}
async deleteUser(id: string) {
return this.userRepository.delete(id);
}
}

// src/modules/user/controller/user.controller.ts

import { Request, Response } from 'express';
import { UserService } from '../service/user.service.js';
import { CreateUserDto } from '../dto/create-user.dto.js';

const userService = new UserService();

export class UserController {
async createUser(req: Request, res: Response) {
const errors = CreateUserDto.validate(req.body);
if (errors.length > 0) {
return res.status(400).json({ errors });
}

    const dto = new CreateUserDto(req.body);
    const user = await userService.createUser(dto);
    res.status(201).json(user);

}

async getUserById(req: Request, res: Response) {
const user = await userService.getUserById(req.params.id);
if (!user) {
return res.status(404).json({ message: 'User not found' });
}
res.status(200).json(user);
}
async getAllUsers(req: Request, res: Response) {
const users = await userService.getAllUsers();
res.status(200).json(users);
}
async updateUser(req: Request, res: Response) {
const user = await userService.updateUser(req.params.id, req.body);
if (!user) {
return res.status(404).json({ message: 'User not found' });
}
res.status(200).json(user);
}
async deleteUser(req: Request, res: Response) {
const success = await userService.deleteUser(req.params.id);
if (!success) {
return res.status(404).json({ message: 'User not found' });
}
res.sendStatus(204);
}
}

// src/modules/user/index.ts

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

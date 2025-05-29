// src/modules/user/infrastructure/user.repository.mongo.ts
import { IUserRepository } from '../repository/user.repository.interface.js';
import { CreateUserDto } from '../dto/create-user.dto.js';
import { UpdateUserDto } from '../dto/update-user.dto.js';
import { UserResponseDto } from '../dto/user-response.dto.js';
import { v4 as uuidv4 } from 'uuid';

export class UserRepositoryMongo implements IUserRepository {
  private users: UserResponseDto[] = [];

  async create(data: CreateUserDto): Promise<UserResponseDto> {
    const newUser: UserResponseDto = { _id: uuidv4(), role: 'user', ...data };
    this.users.push(newUser);
    return newUser;
  }

  async findAll(): Promise<UserResponseDto[]> {
    return this.users;
  }

  async findById(id: string): Promise<UserResponseDto | null> {
    return this.users.find((user) => user._id === id) || null;
  }

  async findByEmail(email: string): Promise<UserResponseDto | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async update(id: string, data: UpdateUserDto): Promise<UserResponseDto | null> {
    const index = this.users.findIndex((user) => user._id === id);
    if (index === -1) return null;

    this.users[index] = { ...this.users[index], ...data };
    return this.users[index];
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user._id !== id);
  }
}

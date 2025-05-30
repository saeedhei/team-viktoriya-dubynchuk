// src/modules/user/repository/user.repository.interface.ts
import { CreateUserDto } from '../dto/create-user.dto.js';
import { UpdateUserDto } from '../dto/update-user.dto.js';
import { UserResponseDto } from '../dto/user.response.dto.js';

export interface IUserRepository {
  create(data: CreateUserDto): Promise<UserResponseDto>;
  findAll(): Promise<UserResponseDto[]>;
  findById(id: string): Promise<UserResponseDto | null>;
  findByEmail(email: string): Promise<UserResponseDto | null>;
  update(id: string, data: UpdateUserDto): Promise<UserResponseDto | null>;
  delete(id: string): Promise<void>;
}

import { CreateUserDto } from '../dto/create-user.dto.js';
import { UserResponseDto } from '../dto/user-response.dto.js';

export interface IUserRepository {
  create(data: CreateUserDto): Promise<UserResponseDto>;
  findByEmail(email: string): Promise<UserResponseDto | null>;
  findAll(): Promise<UserResponseDto[]>;
}

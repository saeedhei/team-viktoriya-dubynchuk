import { IUserRepository } from '../repository/user.repository.interface.js';
import { CreateUserDto } from '../dto/create-user.dto.js';
import { UserResponseDto } from '../dto/user-response.dto.js';
import { v4 as uuidv4 } from 'uuid';

export class UserRepositoryMongo implements IUserRepository {
  private users: UserResponseDto[] = [];

  async create(data: CreateUserDto): Promise<UserResponseDto> {
    const user: UserResponseDto = {
      _id: uuidv4(),
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
    return this.users.find(user => user._id === id) || null;
  }
async update(id: string, updateData: Partial<CreateUserDto>): Promise<UserResponseDto | null> {
  const index = this.users.findIndex(user => user._id === id);
  if (index === -1) return null;

  this.users[index] = { ...this.users[index], ...updateData };
  return this.users[index];
}
  async delete(id: string): Promise<boolean> {
    const index = this.users.findIndex(user => user._id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}

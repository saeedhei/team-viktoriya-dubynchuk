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

// src/modules/user/dto/user-response.dto.ts
import { UserRole } from '../domain/user.types.js';

export interface UserResponseDto {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

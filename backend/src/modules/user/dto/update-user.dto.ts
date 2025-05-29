// src/modules/user/dto/update-user.dto.ts
import { UserRole } from '../domain/user.types.js';

export interface UpdateUserDto {
  name?: string;
  email?: string;
  role?: UserRole;
}

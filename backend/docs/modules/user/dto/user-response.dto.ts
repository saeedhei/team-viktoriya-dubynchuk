import { UserRole } from '../domain/user.types.js';

export interface UserResponseDto {
  _id: string;
  email: string;
  password:string;
  name: string;
  role: UserRole;
}
 
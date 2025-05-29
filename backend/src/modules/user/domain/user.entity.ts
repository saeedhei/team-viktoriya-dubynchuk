// src/modules/user/domain/user.entity.ts
import { UserRole } from './user.types.js';

export class User {
  constructor(
    public name: string,
    public email: string,
    public role: UserRole = 'user',
    public _id?: string,
  ) {}
}

import { UserRole } from './user.types.js';

export class User {
  constructor(
    public email: string,
    public password: string,
    public name: string,
    public role: UserRole = 'user',
    public _id?: string
  ) {}
}
 
export class CreateUserDto {
  username!: string;
  email!: string;
  password!: string;

  constructor(data: any) {
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
  }

  static validate(data: any): string[] {
    const errors: string[] = [];

    if (typeof data.username !== 'string' || data.username.trim() === '') {
      errors.push('Username must be a non-empty string.');
    }

    if (typeof data.email !== 'string' || !/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.push('Email must be a valid email address.');
    }

    if (typeof data.password !== 'string' || data.password.trim() === '') {
      errors.push('Password must be a non-empty string.');
    }

    return errors;
  }
}


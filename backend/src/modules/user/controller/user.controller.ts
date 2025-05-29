import { Request, Response } from 'express';
import { UserService } from '../service/user.service.js';
import { CreateUserDto } from '../dto/create-user.dto.js';

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response) {
    const errors = CreateUserDto.validate(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
 
    const dto = new CreateUserDto(req.body);
    const user = await userService.createUser(dto);
    res.status(201).json(user);
  }

  async getUserById(req: Request, res: Response) {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  }
  async getAllUsers(_: Request, res: Response) {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  }
  async updateUser(req: Request, res: Response) {
  const user = await userService.updateUser(req.params.id, req.body);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
}
  async deleteUser(req: Request, res: Response) {
    const success = await userService.deleteUser(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.sendStatus(204);
  }
}

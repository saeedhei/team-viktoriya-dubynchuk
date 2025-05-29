import { Request, Response } from "express";
import { UserService } from '../service/user.service.js';
import { CreateUserDto } from '../dto/create-user.dto.js';
import { UpdateUserDto } from '../dto/update-user.dto.js';

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response) {
    const dto = req.body as CreateUserDto;
    const user = await userService.createUser(dto);
    res.status(201).json(user);
  }

  async getAllUsers(req: Request, res: Response) {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  }

  async getUserById(req: Request, res: Response) {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  }

  async updateUser(req: Request, res: Response) {
    const dto = req.body as UpdateUserDto;
    const user = await userService.updateUser(req.params.id, dto);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  }

  async deleteUser(req: Request, res: Response) {
    await userService.deleteUser(req.params.id);
    res.status(204).send();
  }
}

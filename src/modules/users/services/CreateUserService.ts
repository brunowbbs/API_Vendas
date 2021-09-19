import AppError from "../../../shared/errors/AppErrors";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {

    const userRepository = getCustomRepository(UserRepository);

    const emailAlreadyExists = await userRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError('Email Address Already used.');
    }

    const user = userRepository.create({
      name,
      email,
      password
    });

    await userRepository.save(user);

    return user;

  }
}

export default CreateUserService;

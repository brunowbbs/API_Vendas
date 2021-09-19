import AppError from "../../../shared/errors/AppErrors";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import authConfig from '../../../config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  userResponse: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {

    const userRepository = getCustomRepository(UserRepository);

    const userResponse = await userRepository.findByEmail(email);

    if (!userResponse) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, userResponse.password);


    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: userResponse.id,
      expiresIn: authConfig.jwt.expiresIn
    })

    return {
      userResponse,
      token
    };
  }
}

export default CreateSessionsService;

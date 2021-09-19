import AppError from "../../errors/AppErrors";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from '../../../config/auth';

interface ITokenPayload {
  iat: number;
  expo: number;
  sub: string;
}


export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.')
  }
  //Bearer 4a6s8q9we46as5d46as5d4qw98e7a6s5d4q5w4eq98w7e4a6s5d4a5sd49q8we76s5d46a5sd4q
  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as ITokenPayload;

    request.user = {
      id: sub
    }

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT token.');
  }


}

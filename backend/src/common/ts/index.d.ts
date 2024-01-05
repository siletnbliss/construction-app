import { VerifyUserResponse } from '../../auth/application/port/in/verify-user.use-case';

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: VerifyUserResponse;
    }
  }
}

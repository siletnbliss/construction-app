import { SetMetadata } from '@nestjs/common';

export enum Role {
  Constructor = 'constructor',
  Provider = 'provider',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

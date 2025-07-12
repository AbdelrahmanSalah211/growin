import { SetMetadata } from '@nestjs/common';
import { UserMode } from 'src/models';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserMode[]) => SetMetadata(ROLES_KEY, roles);
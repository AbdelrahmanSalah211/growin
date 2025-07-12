
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UserMode } from 'src/models';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserMode[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.userMode) {
      return false;
    }

    const hasPermission = requiredRoles.includes(user.userMode);
    if (!hasPermission) {
      throw new ForbiddenException (
        `Access denied. Required roles: ${requiredRoles.join(', ')}. User role: ${user.userMode}`
      );
    }
    return true;
  }
}

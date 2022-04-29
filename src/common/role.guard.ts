import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Request } from 'express';

// import RequestWithUser from '../authentication/requestWithUser.interface';
import { JwtAuthGuard } from './jwt-auth.guard';
import Rol from './rol.enum';

const RoleGuard = (rol: Rol): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<Request>();
      const user = request.user;

      console.log(user);
      console.log(rol);
      //return user?.roles.includes(rol);
      return false;
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;

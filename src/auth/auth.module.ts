import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PersonsModule } from 'src/persons/persons.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { jwtStrategy } from 'src/common/jwt.strategy';
// import { JwtAuthGuard } from 'src/common/jwt-auth.guard';

@Module({
  imports: [PersonsModule,
    JwtModule.register({}),
    ConfigModule,
  ],
  providers: [AuthService, jwtStrategy],
  controllers: [AuthController,]
})
export class AuthModule { }

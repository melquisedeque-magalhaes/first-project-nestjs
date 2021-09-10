import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtGuard } from './auth/jwt.guard';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';

@Module({
  imports: [JwtModule.register({
    secret: 'eadb1c036437e9854e304b4f1c6ddbd8',
    signOptions: {
      expiresIn: '60s'
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategyService]
})
export class AuthModule { }

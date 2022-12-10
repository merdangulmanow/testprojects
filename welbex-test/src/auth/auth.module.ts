import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports : [
    forwardRef( ()=> UsersModule),
    forwardRef( ()=> PostsModule),
    JwtModule.register({
      secret: String(process.env.PRIVATE_KEY),
      signOptions: {
        // expiresIn : '24h'
      }
    })
  ],
  exports: [ AuthService, JwtModule]
})
export class AuthModule {}

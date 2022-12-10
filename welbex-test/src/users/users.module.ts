import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import { AuthModule } from 'src/auth/auth.module';
import { PostModel } from 'src/posts/models/posts.model';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports : [
    SequelizeModule.forFeature([
      UserModel, PostModel
    ]),
    forwardRef(() => AuthModule),
  ],
  exports : [
    UsersService
  ]
})

export class UsersModule {}
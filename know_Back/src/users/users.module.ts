import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { HelperModule } from 'src/helper/helper.module';
import { RolesModule } from 'src/roles/roles.module';
import { UserTopicModel } from './modesl/user.topics.model';
import { UserModel } from './modesl/users.model';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService ],
  imports : [
    SequelizeModule.forFeature([
      UserModel, UserTopicModel
    ]),
    RolesModule, HelperModule,
    forwardRef(() => AuthModule),
  ],
  exports: [
    UsersService,
  ]
})
export class UsersModule {}
import { Module } from '@nestjs/common';
import { ModeratorsService } from './moderators.service';
import { ModeratorsController } from './moderators.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/users/modesl/users.model';
import { ModeratorModel } from './moderators.model';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  providers: [ModeratorsService],
  controllers: [ModeratorsController],
  imports : [
    SequelizeModule.forFeature([
      UserModel, ModeratorModel
    ]),
    UsersModule, AuthModule, RolesModule
  ]
})
export class ModeratorsModule {}

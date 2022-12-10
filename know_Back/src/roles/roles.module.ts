import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/users/modesl/users.model';
import { RolesController } from './roles.controller';
import { Roles } from './roles.model';
import { RolesService } from './roles.service';
import { UserRoles } from './user-roles.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports : [
    SequelizeModule.forFeature([Roles, UserModel, UserRoles]),
  ],
  exports: [
    RolesService
  ]
})
export class RolesModule {}

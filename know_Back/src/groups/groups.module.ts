import { forwardRef, Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { GroupModel } from './models/groups.mode';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { MessagesModel } from 'src/messages/models/messages.model';

@Module({
  providers: [GroupsService],
  controllers: [GroupsController],
  imports : [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([
      GroupModel, MessagesModel
    ]),
    // JwtModule.register({})
  ]
})
export class GroupsModule {}

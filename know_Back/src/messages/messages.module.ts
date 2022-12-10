import { forwardRef, Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessageGateway } from './message.gateway';
import { SequelizeModule } from '@nestjs/sequelize';
import { MessagesModel } from './models/messages.model';
import { GroupModel } from 'src/groups/models/groups.mode';
import { UserModel } from 'src/users/modesl/users.model';
import { AuthModule } from 'src/auth/auth.module';
import { HelperModule } from 'src/helper/helper.module';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessageGateway],
  imports : [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([
      MessagesModel, GroupModel
    ]),
    HelperModule
  ]
})
export class MessagesModule {}

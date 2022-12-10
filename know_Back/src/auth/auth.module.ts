import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize/dist';
import { GroupsModule } from 'src/groups/groups.module';
import { HelperModule } from 'src/helper/helper.module';
import { MessagesModel } from 'src/messages/models/messages.model';
import { UserModel } from 'src/users/modesl/users.model';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthValidateModel } from './auth.validate.model';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports : [
    forwardRef(() => UsersModule),
    forwardRef(() => GroupsModule),
    forwardRef(() => MessagesModel),
    JwtModule.register({
      secret: String(process.env.PRIVATE_ACCESS_KEY),
      signOptions: {
        // expiresIn: '24h'
      }
    }),
    SequelizeModule.forFeature([
      UserModel, AuthValidateModel
    ]),
    HelperModule, GroupsModule
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
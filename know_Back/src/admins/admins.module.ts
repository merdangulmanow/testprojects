import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelperModule } from 'src/helper/helper.module';
import { AdminModel } from './admin.model';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService],
  imports : [
    SequelizeModule.forFeature([AdminModel]),
    JwtModule.register({
      secret: process.env.ACCESS_ADMIN_PRIVATE_KEY,
      signOptions: {
        // expiresIn: '24h'
      }
    }),
    HelperModule
  ]
})
export class AdminsModule {}

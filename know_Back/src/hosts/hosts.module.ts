import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { HostModel } from './hosts..model';
import { HostsController } from './hosts.controller';
import { HostsService } from './hosts.service';

@Module({
  controllers: [HostsController],
  providers: [HostsService],
  imports : [
    SequelizeModule.forFeature([
      HostModel
    ]),
    JwtModule.register({
      secret: process.env.ACCESS_HOST_PRIVATE_KEY
    })
  ],
  exports : [
    JwtModule
  ]
})
export class HostsModule {}

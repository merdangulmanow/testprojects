import { CacheModule, Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { MailService } from './mail.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  providers: [FilesService, MailService],
  exports : [FilesService, MailService],
  imports : [
    // CacheModule.register({
    //   store: redisStore,
    //   socket: {
    //     // host: process.env.REDIS_HOST,
    //     port: Number(process.env.REDIS_PORT),
    //     // host : 'redis-19408.c55.eu-central-1-1.ec2.cloud.redislabs.com',
    //     // port : 19408,
    //     // password : "e29GkpIu5InayCHqtlRVpYBZty3WrGFV"
    //   },
    // }),
    CacheModule.register(),
  ]
})
export class FilesModule {}

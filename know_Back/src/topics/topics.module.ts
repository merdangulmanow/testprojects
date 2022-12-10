import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthorModel } from 'src/authors/models/author.model';
import { AuhtorTopicsModel } from 'src/authors/models/author.topics.model';
import { HelperModule } from 'src/helper/helper.module';
import { TagsModule } from 'src/tags/tags.module';
import { Topics } from './topic.model';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';

@Module({
  controllers: [TopicsController],
  providers: [TopicsService],
  imports : [
    SequelizeModule.forFeature([
      Topics, AuhtorTopicsModel, AuthorModel
    ]),
    HelperModule, TagsModule
  ]
})
export class TopicsModule {}

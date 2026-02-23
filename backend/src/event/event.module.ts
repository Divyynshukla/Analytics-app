import { forwardRef, Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { ProjectModule } from 'src/project/project.module';
import { Project } from 'src/project/entities/project.entity';

@Module({
  imports : [
    forwardRef(() => ProjectModule) 
    ,TypeOrmModule.forFeature([Event,Project])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}

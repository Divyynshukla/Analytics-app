import { Module, forwardRef } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { EventModule } from 'src/event/event.module';
import { Event } from 'src/event/entities/event.entity';

@Module({
  imports: [
    UserModule,
    forwardRef(() => EventModule), 
    TypeOrmModule.forFeature([Project, User, Event]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}

import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(@InjectRepository(Project) private projectRepository: Repository<Project>, @InjectRepository(Event) private eventRepository: Repository<Event>) {}


 async create(apiKey: string, createEventDto: CreateEventDto) {
   try {
      const project = await this.projectRepository.findOneBy({ apiKey });
    if(!project){
      throw new Error("project not found");
    }
    const event = this.eventRepository.create({
      ...createEventDto,
      projectId: project.id,
      projIdHash : project.projIdHash
    });
    return this.eventRepository.save(event);
    
   } catch (error) {
      console.log(error);
      throw new Error("project not found");
   }
  
  }

  findAll() {
    return `This action returns all event`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}

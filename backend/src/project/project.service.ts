import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import { User } from 'src/user/entities/user.entity';
import { Event } from 'src/event/entities/event.entity';

@Injectable()
export class ProjectService {
  constructor(@InjectRepository(Project) private projectRepository: Repository<Project>, @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Event) private eventRepository: Repository<Event>) { }

  async create(dto: CreateProjectDto, userHash: string) {
    const user = await this.userRepository.findOneBy({ userHash: userHash });

    console.log("iddd", user)


    if (!user) throw new Error('User not found');

    const project = this.projectRepository.create({
      ...dto,
      apiKey: this.generateApiKey(),
      user,
      userHash: userHash
    });

    return this.projectRepository.save(project);
  }

  private generateApiKey(): string {
    return randomBytes(32).toString('hex');
  }

  async findAll(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['projects'],
    });
    return user?.projects ?? [];
  }


async getStats(projIdHash: string) {
  const now = new Date();

  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(todayStart.getDate() - 1);

  const weekStart = new Date(todayStart);
  weekStart.setDate(todayStart.getDate() - 7);

  const monthStart = new Date(todayStart);
  monthStart.setMonth(todayStart.getMonth() - 1);

  const yearStart = new Date(todayStart);
  yearStart.setFullYear(todayStart.getFullYear() - 1);

  const totalEvents = await this.eventRepository.count({
    where: { projIdHash },
  });

  const eventsToday = await this.eventRepository.count({
    where: {
      projIdHash,
      createdAt: MoreThanOrEqual(todayStart),
    },
  });

  const eventsYesterday = await this.eventRepository.count({
    where: {
      projIdHash,
      createdAt: Between(yesterdayStart, todayStart),
    },
  });

  const eventsThisWeek = await this.eventRepository.count({
    where: {
      projIdHash,
      createdAt: MoreThanOrEqual(weekStart),
    },
  });

  const eventsThisMonth = await this.eventRepository.count({
    where: {
      projIdHash,
      createdAt: MoreThanOrEqual(monthStart),
    },
  });

  const eventsThisYear = await this.eventRepository.count({
    where: {
      projIdHash,
      createdAt: MoreThanOrEqual(yearStart),
    },
  });

  const eventsLastMonth = await this.eventRepository.count({
    where: {
      projIdHash,
      createdAt: Between(monthStart, todayStart),
    },
  });

  const eventsLastYear = await this.eventRepository.count({
    where: {
      projIdHash,
      createdAt: Between(yearStart, todayStart),
    },
  });

  return {
    totalEvents,
    eventsToday,
    eventsYesterday,
    eventsThisWeek,
    eventsThisMonth,
    eventsLastMonth,
    eventsThisYear,
    eventsLastYear,
  };
}


  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}

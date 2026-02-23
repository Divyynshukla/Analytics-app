import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService) {}

async create(createUserDto: CreateUserDto) {
  const password = await bcrypt.hash(createUserDto.password, 10);

  const user = this.userRepository.create({
    ...createUserDto,
    password,
  });

  return this.userRepository.save(user);
}
  async login(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({ email: createUserDto.email });
    if (!user) {
      throw new Error('User not found');
    }
    const password = await bcrypt.compare(createUserDto.password, user.password);
    if (!password) {
      throw new Error('Invalid password');
    }
     return {
      accessToken: this.jwtService.sign({
        sub: user.userHash,
      }),
    };;
  }

  async findAll() {
    return `This action returns all auth`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

    async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}

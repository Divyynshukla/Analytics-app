import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from 'src/user/dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService) {}

async create(createUserDto: CreateUserDto) {
  const password = await bcrypt.hash(createUserDto.password, 10);

  const user = this.userRepository.create({
    name: createUserDto.name,
    email: createUserDto.email,
    password,
  });

  await this.userRepository.save(user)

  return {message: "register successfully"} ;
}
  async login(LoginDto: SigninDto) {
    const user = await this.userRepository.findOneBy({ email: LoginDto.email });
    if (!user) {
      throw new Error('User not found');
    }
    const password = await bcrypt.compare(LoginDto.password, user.password);
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

import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneById(id: number):Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        id
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        id
      }
    });

    return this.userRepository.save(updateUserDto)
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }

  // findByUsername(username: string) {
  //   return this.userRepository.findOne({where: {username}});
  // }

  async findByUsername(username: string) {
    const student = await this.userRepository.findOne({
      where: {
        username
      },
    });
    if (!student) return false;
    return student;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  createUser(user: CreateUserDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const userToSave = this.userRepository.create(user);
        resolve(await this.userRepository.save(userToSave));
      } catch (error) {
        reject(error);
      }
    });
  }
}

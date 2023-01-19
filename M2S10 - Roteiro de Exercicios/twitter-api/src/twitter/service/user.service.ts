import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/core/auth/auth.service';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  changePassword(userId: number, dto: ChangePasswordDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userRepository.findOne({
          where: { id: userId },
        });
        if (!user) {
          throw new NotFoundException('user not found');
        }

        const { current_password, new_password } = dto;

        if (await user.checkPassword(current_password)) {
          user.salt = await bcrypt.genSalt(12);

          user.password = await bcrypt.hash(new_password, user.salt);

          const updatedUser = await this.userRepository.save(user);

          delete updatedUser.salt;
          delete updatedUser.password;

          resolve(updatedUser);
        } else {
          throw new UnauthorizedException('current password did not match');
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}

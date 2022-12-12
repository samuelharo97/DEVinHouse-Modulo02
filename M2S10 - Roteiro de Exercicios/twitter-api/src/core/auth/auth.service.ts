import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDTO } from 'src/core/auth/dto/credentials.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayloadUser } from 'src/twitter/utils/jwt-payload-user';
import { User } from 'src/twitter/entities/user.entity';
import { CreateUserDto } from 'src/twitter/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return await this.createUser(createUserDto);
  }

  async signIn(credentials: CredentialsDTO) {
    const user = await this.checkCredentials(credentials);
    if (user === null) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos');
    }

    const jwtPayload: JwtPayloadUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const token = await this.jwtService.sign(jwtPayload);
    return { token };
  }

  createUser(createUser: CreateUserDto): Promise<User> {
    return new Promise(async (resolve) => {
      const { email, name, password, username } = createUser;
      const user = this.userRepository.create();
      user.email = email;
      user.name = name;
      user.username = username;
      user.salt = await bcrypt.genSalt(12);
      user.password = await this.hashPassword(password, user.salt);
      const userCreated = await this.userRepository.save(user);
      delete userCreated.password;
      delete user.salt;
      resolve(user);
    });
  }

  async checkCredentials(credentials: CredentialsDTO) {
    const { email, password } = credentials;
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (user && (await user.checkPassword(password))) {
      return user;
    }
    return null;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  validateToken(jwtToken: string) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(
          await this.jwtService.verifyAsync(jwtToken, {
            ignoreExpiration: false,
          }),
        );
      } catch (error) {
        reject({
          code: 401,
          detail: 'JWT expired.',
        });
      }
    });
  }

  decodedToken(jwtToken: string) {
    return this.jwtService.decode(jwtToken);
  }
}

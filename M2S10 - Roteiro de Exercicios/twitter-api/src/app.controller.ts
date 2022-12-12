import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './core/auth/auth.service';
import { CredentialsDTO } from './core/auth/dto/credentials.dto';
import { CreateUserDto } from './twitter/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('/auth/signup')
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    await this.authService.signUp(createUserDto);
    return {
      message: 'Cadastro realizado.',
    };
  }

  @Post('/auth/signin')
  async signIn(@Body(ValidationPipe) credentialsDto: CredentialsDTO) {
    return await this.authService.signIn(credentialsDto);
  }
}

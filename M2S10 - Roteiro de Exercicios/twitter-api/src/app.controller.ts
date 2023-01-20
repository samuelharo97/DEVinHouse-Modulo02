import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './core/auth/auth.service';
import { CredentialsDTO } from './core/auth/dto/credentials.dto';
import { GoogleOAuthGuard } from './core/auth/guards/google-oauth.guard';
import { CreateUserDto } from './twitter/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get('/auth/with-google')
  @UseGuards(GoogleOAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  async googleAuth(@Request() req) {}

  @Get('/auth/google-redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req) {
    return {
      mensagem: 'Google Info',
      user: req.user,
    };
  }

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

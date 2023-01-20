import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TwitterModule } from './twitter/twitter.module';
import { databaseProviders } from './core/database/database.provider';
import { twitterProviders } from './twitter/twitter.providers';
import { AuthService } from './core/auth/auth.service';
import { JwtStrategy } from './core/auth/guards/strategy/jwt.strategy';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { GoogleStrategy } from './core/auth/guards/strategy/google.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 60 * 6 * 4,
      },
    }),
    TwitterModule,
  ],
  controllers: [AppController],
  providers: [
    ...databaseProviders,
    ...twitterProviders,
    AppService,
    AuthService,
    JwtStrategy,
    GoogleStrategy,
  ],
})
export class AppModule {}

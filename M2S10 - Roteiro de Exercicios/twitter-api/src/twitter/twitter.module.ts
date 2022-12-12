import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/core/auth/auth.service';
import { JwtStrategy } from 'src/core/auth/guards/strategy/jwt.strategy';
import { databaseProviders } from 'src/core/database/database.provider';
import { TwitterController } from './controller/twitter.controller';
import { TweetService } from './service/tweet.service';
import { UserService } from './service/user.service';
import { twitterProviders } from './twitter.providers';

@Module({
  controllers: [TwitterController],
  providers: [
    ...databaseProviders,
    ...twitterProviders,
    UserService,
    TweetService,
    AuthService,
    JwtStrategy,
    JwtService,
  ],
})
export class TwitterModule {}

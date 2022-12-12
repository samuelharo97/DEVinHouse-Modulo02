import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { CreateTweetDto } from '../dto/create-tweet.dto';
import { TweetService } from '../service/tweet.service';
import { UserService } from '../service/user.service';

@UseGuards(JwtAuthGuard)
@Controller('twitter')
export class TwitterController {
  constructor(
    private readonly userService: UserService,
    private readonly tweetService: TweetService,
  ) {}

  @Get('feed/:userId')
  async listFeed(@Param('UserId') UserId: number) {
    return;
  }

  @Post('/tweet')
  createTweet(@Request() request, @Body() createTweetDto: CreateTweetDto) {
    return this.tweetService.createTweet(request.user, createTweetDto);
  }

  @Get('/tweet/:id')
  async getTweet(@Param('id') id: string) {
    return await this.tweetService.accessTweet(+id);
  }
}

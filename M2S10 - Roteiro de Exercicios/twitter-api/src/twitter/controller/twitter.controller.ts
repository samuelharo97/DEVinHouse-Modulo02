import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
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

  @Get('feed')
  async listFeed(@Request() request) {
    const feed = await this.tweetService.listFeed(request.user['id']);
    return feed;
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

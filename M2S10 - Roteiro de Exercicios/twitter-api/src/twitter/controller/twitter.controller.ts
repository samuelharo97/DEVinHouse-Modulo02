import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
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

  @Get('/feed')
  async listFeed(@Request() request) {
    const feed = await this.tweetService.listFeed(request.user['id']);
    return feed;
  }

  @Get('/hashtag')
  async getTweetsByHashtag(@Query('hashtag') hashtag: string) {
    const tweets = await this.tweetService.getTweetsByHashtag(hashtag);
    return tweets;
  }

  @Get('trending')
  async getTrending() {
    const trending = await this.tweetService.getTrendingTopics();
    return trending;
  }

  @Get('/tweets')
  async findAll(@Request() request) {
    const allTweets = await this.tweetService.findAllTweets(request.user['id']);

    return allTweets;
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

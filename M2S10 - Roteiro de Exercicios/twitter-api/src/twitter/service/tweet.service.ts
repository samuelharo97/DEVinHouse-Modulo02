import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateTweetDto } from '../dto/create-tweet.dto';
import { Tweet } from '../entities/tweet.entity';
import { User } from '../entities/user.entity';
import { JwtPayloadUser } from '../utils/jwt-payload-user';

@Injectable()
export class TweetService {
  constructor(
    @Inject('TWEET_REPOSITORY')
    private tweetRepository: Repository<Tweet>,

    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  createTweet(userPayload: JwtPayloadUser, tweet: CreateTweetDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = this.userRepository.create(userPayload);

        const tweetInstance = this.tweetRepository.create();

        tweetInstance.content = tweet.content;
        tweetInstance.user = user;

        resolve(await this.tweetRepository.save(tweetInstance));
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  accessTweet(id: number) {
    return new Promise(async (resolve, reject) => {
      const tweet = await this.tweetRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          user: true,
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            id: true,
            name: true,
            username: true,
          },
        },
      });

      if (!tweet) {
        reject('Tweet not found');
      }

      resolve(tweet);
    });
  }
}

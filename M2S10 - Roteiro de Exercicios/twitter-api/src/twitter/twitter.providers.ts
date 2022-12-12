import { DataSource } from 'typeorm';
import { Tweet } from './entities/tweet.entity';
import { User } from './entities/user.entity';

export const twitterProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'TWEET_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tweet),
    inject: ['DATA_SOURCE'],
  },
];

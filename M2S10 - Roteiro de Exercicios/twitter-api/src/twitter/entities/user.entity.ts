import { Tweet } from 'src/twitter/entities/tweet.entity';
import * as bcrypt from 'bcrypt';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 100 })
  name: string;

  @Column({ length: 35 })
  username: string;

  @Column({ nullable: true, default: '' })
  photo: string;

  @Column({ length: 300, nullable: true })
  bio: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ default: false })
  privateAccount: boolean;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  salt: string;

  @OneToMany(() => Tweet, (tweets) => tweets.user)
  tweets: Tweet[];

  addTweet(tweet: any) {
    if (this.tweets == null) {
      this.tweets = new Array<Tweet>();
    }
    this.tweets.push(tweet);
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

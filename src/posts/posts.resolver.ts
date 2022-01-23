import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { Post } from './models/post.model';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Post])
  async posts() {
    return this.prisma.post.findMany();
  }

  @Mutation(() => Post)
  async createPost(
    @Args('title') title: string,
    @Args('content') content: string,
  ) {
    return this.prisma.post.create({ data: { title, content } });
  }

  @Mutation(() => Post)
  async updatePost(
    @Args('id') id: number,
    @Args('title') title: string,
    @Args('content') content: string,
  ) {
    return this.prisma.post.update({
      where: {
        id: id,
      },
      data: { title, content },
    });
  }

  @Mutation(() => Post)
  async deletePost(@Args('id') id: number) {
    return this.prisma.post.delete({ where: { id: id } });
  }
}

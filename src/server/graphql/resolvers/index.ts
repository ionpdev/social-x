import { PrismaClient } from "../../db/client";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    users: () => prisma.user.findMany({ include: { posts: true } }),
    posts: () => prisma.post.findMany({ include: { user: true } }),
    // Implement 'me' using context.user if you wire up Auth/JWT
  },
  Mutation: {
    // Implement these for full functionality!
  },
  User: {
    posts: (parent: any) =>
      prisma.post.findMany({ where: { userId: parent.id } }),
  },
  Post: {
    user: (parent: any) =>
      prisma.user.findUnique({ where: { id: parent.userId } }),
  },
};

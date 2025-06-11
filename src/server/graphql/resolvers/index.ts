import { prisma } from "../../db/client";
import { hash } from "bcrypt";

export const resolvers = {
  Query: {
    users: () => prisma.user.findMany({ include: { posts: true } }),
    posts: () => prisma.post.findMany({ include: { user: true } }),
    me: (_, __, context) => {
      if (!context.user) return null;
      return prisma.user.findUnique({
        where: { id: context.user.id },
        include: { posts: true },
      });
    },
  },
  Mutation: {
    signup: async (_, { email, password, name }) => {
      const hashedPassword = await hash(password, 10);
      return prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });
    },
    addPost: async (_, { content }, context) => {
      if (!context.user) throw new Error("Not authenticated");
      return prisma.post.create({
        data: {
          content,
          userId: context.user.id,
        },
      });
    },
  },
  User: {
    posts: (parent) => prisma.post.findMany({ where: { userId: parent.id } }),
  },
  Post: {
    user: (parent) => prisma.user.findUnique({ where: { id: parent.userId } }),
  },
};

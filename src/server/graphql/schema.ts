import { createSchema } from "graphql-yoga";
import { resolvers } from "./resolvers";

export const schema = createSchema({
  typeDefs: `
    type User {
      id: ID!
      name: String
      email: String!
      posts: [Post!]!
    }

    type Post {
      id: ID!
      content: String!
      user: User!
      createdAt: String!
    }

    type Query {
      users: [User!]!
      posts: [Post!]!
      me: User
    }

    type Mutation {
      addPost(content: String!): Post!
      signup(email: String!, password: String!, name: String): User!
      login(email: String!, password: String!): String! # returns JWT
    }
  `,
  resolvers,
});

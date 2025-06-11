import { createYoga } from "graphql-yoga";
import { schema } from "../../src/server/graphql/schema";
import { getToken } from "next-auth/jwt";

export default createYoga({
  schema,
  context: async ({ request }) => {
    const token = await getToken({ req: request });
    return { user: token };
  },
});

export const config = { api: { bodyParser: false } };

import { createYoga } from "graphql-yoga";
import { schema } from "../../src/server/graphql/schema";

export default createYoga({ schema });
export const config = { api: { bodyParser: false } };

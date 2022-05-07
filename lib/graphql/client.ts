import { GraphQLClient } from "graphql-request";
import { getSdk } from "./generated";

const host = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";
export const graphqlClient = getSdk(new GraphQLClient(`${host}/graphql`));

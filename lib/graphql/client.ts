import { GraphQLClient } from "graphql-request";
import { getSdk } from "./generated";

const host =
  process.env.NEXT_PUBLIC_API_ENDPOINT ||
  "https://tolymer-one-api.herokuapp.com";

export const graphqlClient = getSdk(new GraphQLClient(`${host}/graphql`));

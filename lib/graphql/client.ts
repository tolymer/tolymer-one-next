import { GraphQLClient } from "graphql-request";
import { getSdk } from "./generated";

const host =
  process.env.NODE_ENV === "production"
    ? "https://tolymer-one-api.herokuapp.com"
    : "http://localhost:5200";

export const graphqlClient = getSdk(new GraphQLClient(`${host}/graphql`));

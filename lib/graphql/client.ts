import { GraphQLClient } from "graphql-request";
import { API_URL_BASE } from "../constants";
import { getSdk } from "./generated";

const client = new GraphQLClient(`${API_URL_BASE}/graphql`);
export const graphqlClient = getSdk(client);

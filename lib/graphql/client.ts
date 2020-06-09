import { GraphQLClient } from "graphql-request";
import { getSdk } from "./generated";
import { useEffect, useState } from "react";

const host = "http://localhost:5200";

export const graphqlClient = getSdk(new GraphQLClient(`${host}/graphql`));

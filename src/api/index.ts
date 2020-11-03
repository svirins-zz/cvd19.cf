import { request } from "graphql-request";
import { RequestDocument } from "graphql-request/dist/types";

export const fetcher = (query: RequestDocument) =>
  request(process.env.GATSBY_GRAPHQL_ENDPOINT ?? "", query);

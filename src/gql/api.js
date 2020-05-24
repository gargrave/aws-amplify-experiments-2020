import { API, graphqlOperation } from "aws-amplify";

import { parsePayload } from "./helpers/parsePayload";

export const performQuery = async (query) => {
  const result = await API.graphql(graphqlOperation(query.query));
  return parsePayload(query.name)(result);
};

export const performMutation = async (mutation, payload) => {
  const result = await API.graphql(
    graphqlOperation(mutation.mutation, { input: payload })
  );
  return parsePayload(mutation.name)(result);
};

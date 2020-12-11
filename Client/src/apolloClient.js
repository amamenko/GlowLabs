import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";

const webSocketsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  reconnect: true,
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefintion" &&
      definition.operation === "subscription"
    );
  },
  webSocketsLink,
  httpLink
);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link,
  onError: ({ graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message }) => console.log(message));
    }
  },
});

export default apolloClient;

import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import typeDefs from './schema'

const client = new ApolloClient({
  uri: process.env.API_URL,
  cache: new InMemoryCache(),
  typeDefs
});

export default client;

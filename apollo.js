import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
} from "@apollo/client";
import typeDefs from './schema'

const httpLink = new HttpLink({uri: process.env.API_URL})

const authLink = new ApolloLink((operation, forward) => {
  try {
      // Retrieve the authorization token from local storage.
    const token = localStorage.getItem('token');
    // Use the setContext method to set the HTTP headers.

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  } catch (error) {
    console.log(error)
  } finally {
    // Call the next link in the middleware chain.
    return forward(operation);
  }

});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  typeDefs
});

export default client;

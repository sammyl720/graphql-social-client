import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
} from "@apollo/client";

const httpLink = new HttpLink({uri: process.env.API_URL})
const authLink = new ApolloLink((operation, forward) => {

      // Retrieve the authorization token from local storage.
    // const token = localStorage.getItem('token');
    // Use the setContext method to set the HTTP headers.
    let token = null;
    if(process.browser){
      token = localStorage.getItem('token')
    }
    operation.setContext({
      headers: {
      Authorization: token ? `Bearer ${token}` : '',
      pizza: 'with-fries'
    }})
    return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),

});

export default client;

import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  TypePolicies,
} from "@apollo/client";
import { Post, Comment } from "./interfaces";

const httpLink = new HttpLink({uri: process.env.NEXT_PUBLIC_API_URL })
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
      Authorization: token ? `Bearer ${token}` : ''
    }})
    return forward(operation);
});



const typePolicies:TypePolicies = {
  User: {
    fields: {
      posts: {
        merge (existing = [], incoming: Post[]) {
          return incoming
        }
      }
    }
  },

  Post: {
    fields: {
      comments: {
        merge (existing = [], incoming: Comment[]){
          return incoming;
        }
      },
      likes: {
        merge (existing = [], incoming: string[]){
          return incoming
        }
      }
    }
  }
}

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ typePolicies }),
});

export default client;

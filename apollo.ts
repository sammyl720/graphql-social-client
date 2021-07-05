import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  TypePolicies,
} from "@apollo/client";
import { Post, Comment } from "./interfaces";
import { memoryToken } from './memory'
const httpLink = new HttpLink({uri: process.env.NEXT_PUBLIC_API_URL })
const authLink = new ApolloLink((operation, forward) => {
    // console.log(`Enviroment: ${process.browser ? 'CSR' : 'SSR' }`)

      // Retrieve the authorization token from local storage.
    // const token = localStorage.getItem('token');
    // Use the setContext method to set the HTTP headers.
    let token = memoryToken();
    if(process.browser && token){
      operation.setContext({
        headers: {
        authorization: token && `Bearer ${token}`
      }})
    }
    return forward(operation);
});



const typePolicies:TypePolicies = {
  Query: {
  },
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

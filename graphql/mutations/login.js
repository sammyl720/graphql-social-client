
import { gql } from 'graphql-tag'
const LOGIN = gql`
  mutation Login($email: String!, $password: String!){
    login(data: { email: $email, password: $password}){
      ... on Token{
        token
        expireTime
      }
      
      ... on Error {
        message
        errors
      }
    }
  }
`


export default LOGIN;
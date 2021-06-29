import { gql } from "@apollo/client";

const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!, $name: String!){
    signup(data: { email: $email, password: $password, name: $name }){
      ... on Token{
        token
      }
      
      ... on Error {
        message
        errors
      }
    }
  }
`

export default SIGN_UP;
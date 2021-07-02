import { gql } from "@apollo/client";

const RESET_PASSWORD = gql`
  mutation ResetPassword($password: String!){
    resetPassword(password:$password){
      ... on Success {
        status
      }
      ... on Error {
        message
        errors
      }
    }
  }
`

export default RESET_PASSWORD;
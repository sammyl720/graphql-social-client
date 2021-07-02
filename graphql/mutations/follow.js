import { gql } from "@apollo/client";

const FOLLOW = gql`
  mutation Follow($id: ID!){
    follow(id:$id){
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

export default FOLLOW;
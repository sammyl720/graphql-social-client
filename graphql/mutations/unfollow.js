import { gql } from "@apollo/client";

const UNFOLLOW = gql`
  mutation UnFollow($id: ID!){
    unfollow(id:$id){
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

export default UNFOLLOW;
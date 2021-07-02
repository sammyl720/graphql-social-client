import { gql } from "@apollo/client";

const ADD_FOLLOW = gql`
  mutation AddFollow($id: ID!){
    addFollow(id:$id){
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

export default ADD_FOLLOW;
import { gql } from "@apollo/client";

const TOGGLE_LIKE_POST = gql`
  mutation ToggleLikePost($id: ID!){
    toggleLikePost(id:$id){
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

export default TOGGLE_LIKE_POST;
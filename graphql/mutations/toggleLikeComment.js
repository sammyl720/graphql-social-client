import { gql } from "@apollo/client";

const TOGGLE_LIKE_COMMENT = gql`
  mutation ToggleLikeComment($id: ID!){
    toggleLikeComment(id:$id){
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

export default TOGGLE_LIKE_COMMENT;
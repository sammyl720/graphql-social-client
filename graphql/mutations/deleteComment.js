import { gql } from '@apollo/client'

const DELETE_COMMENT = gql`
  mutation DeleteComment($id ID!){
    deleteComment(id:$id){
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

export default DELETE_COMMENT
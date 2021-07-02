import { gql } from '@apollo/client'

const DELETE_POST = gql`
  mutation DeletePost($id ID!){
    deletePost(id:$id){
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

export default DELETE_POST
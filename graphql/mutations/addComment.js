import {gql} from '@apollo/client';

const ADD_COMMENT = gql`
  mutation AddComment($data: AddCommentInput){
    addComment(data:$data){
      ... on Error {
        message
        errors
      }
      ... on Comment {
        id
        text
        user {
          profile_img {
            public_id
          }
          name
          id
        }
        images {
          public_id
        }

        created_on {
          full_date
        }
      }
    }
  }
`
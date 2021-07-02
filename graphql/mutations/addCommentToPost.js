import {gql} from '@apollo/client';

const ADD_COMMENT_TO_POST = gql`
  mutation AddCommentToPost($data: AddPostCommentInput){
    addCommentToPost(data:$data){
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

export default ADD_COMMENT_TO_POST;
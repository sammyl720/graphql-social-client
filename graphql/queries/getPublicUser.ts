import {gql} from '@apollo/client';
import { COMMENT_FRAGMENT, DATE_FRAGMENT, IMAGE_FRAGMENT, POST_FRAGMENT } from '../fragments';

const GET_PUBLIC_USER = gql`
  query GetUser($id:ID!){
    publicUser(id: $id){
      ... on User {
      id
      name
      email
      profile_img {
          ... image
      }
      followers {
        id
        name
        profile_img {
          ... image
        }
      }
      following {
        id
        name
        profile_img {
            ... image
        }
      }
      posts {
        ... postFragment
      }
      date_joined {
        ... dateFragment
      }
      last_login {
        ... dateFragment
      }
    }    
    ... on Error {
      message
      errors
    }
    
  }
}

${POST_FRAGMENT}

${COMMENT_FRAGMENT}

${DATE_FRAGMENT}

${IMAGE_FRAGMENT}
`

export default GET_PUBLIC_USER
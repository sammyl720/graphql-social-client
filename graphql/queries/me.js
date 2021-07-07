import {gql} from '@apollo/client';
import { POST_FRAGMENT, DATE_FRAGMENT, IMAGE_FRAGMENT, COMMENT_FRAGMENT } from '../fragments';

const ME = gql`
{
  me {
    ... on User {
      id
      verified
      name
      email
      bio
      profile_img {
          ... image
      }
      followers {
        id
        name
        bio
        profile_img {
          ... image
        }
      }
      following {
        id
        name
        bio
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


export default ME
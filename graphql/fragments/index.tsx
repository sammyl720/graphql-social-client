import { gql } from '@apollo/client'

export const IMAGE_FRAGMENT = gql`
  fragment image on Image  {
    url
    id
    public_id
    secure_url
  }
`

export const DATE_FRAGMENT = gql`
fragment dateFragment on Date {
  date
  time
  full_date
  unix
}
`

export const COMMENT_FRAGMENT = gql`
  fragment commentFragment on Comment {
    id
    created_on {
      ... dateFragment
    }
    text
    user {
      id
      name
      profile_img {
        ... image
      }
    }
  }
`

export const POST_FRAGMENT = gql`
  fragment postFragment on Post {
    id
    text
    images {
      ... image
    }
    created_on {
      ... dateFragment
    }
    likeCount
    likes {
      name
      id
    }
    comments {
      ... commentFragment
    }
    user {
      id
      name
      profile_img {
        ... image
      }
    }
  }
`
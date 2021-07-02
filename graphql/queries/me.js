import {gql} from '@apollo/client';

const ME = gql`
{
  me {
    ... on User {
      id
      verified
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
        text
        images {
          ... image
        }
        user {
          id
          name
          profile_img {
            ... image
          }
        }
        created_on {
          ... date
        }
        
        likes {
          name
          id
          profile_img {
            ... image
          }
        }
        
        comments {
          text
          created_on {
            date
          }
          user {
            id
            name
            profile_img {
              ... image
            }
          }
          likes {
            name
            id
            profile_img {
              ... image
            }
          }
          images {
            ... image
          }
        }
      }
      date_joined {
        ... date
      }
      last_login {
        ... date
      }
    }
    
    ... on Error {
      message
      errors
    }
    
  }
}

fragment date on Date {
  date
  time
  full_date
}

fragment image on Image  {
  url
  id
  public_id
  secure_url
}
`
export default ME
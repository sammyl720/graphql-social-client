import {gql} from '@apollo/client';

const USER = gql`
query User($id: ID!){
  
  user(id:$id) {
    ... on User {
      id
      verified
      name
      email
      profile_img
      followers {
        id
        name
        profile_img
      }
      following {
        id
        name
        profile_img
      }
      posts {
        text
        images
        created_on {
          ... date
        }
        
        likes {
          name
          id
          profile_img
        }
        
        comments {
          text
          created_on {
            date
          }
          user {
            id
            name
            profile_img
          }
          likes {
            name
            id
            profile_img
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
`
export default USER
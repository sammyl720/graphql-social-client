import { gql } from '@apollo/client';

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($data: updateProfileInput){
    updateProfile(data: $data){
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

export default UPDATE_PROFILE;
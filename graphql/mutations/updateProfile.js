import { gql } from '@apollo/client'

const UPDATE_PROFILE = gql`
  mutation UpdateProfile( $data: updateProfileInput ){
    updateProfile(data:$data){
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

// input updateProfileInput {
//   name: String
//   gender: Gender
//   profile_img: ImageInput
//   bio: String
//   private: Boolean
// }

export default UPDATE_PROFILE;